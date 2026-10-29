import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { CreateChemicalCargoUseCase } from '@/application/use-cases/create-chemical-cargo'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import { ProductStatus } from '@/domain/enums/product-status.enum'
import { InactiveProductError } from '@/domain/errors/inactive-product-error'
import {
  createChemicalCargoBodySchema,
  type CreateChemicalCargoDTO,
} from '@/interfaces/dtos/create-chemical-cargo.dto'
import { makeChemicalProduct } from '../../../factories/make-chemical-product'
import { InMemoryChemicalCargoRepository } from '../../../repositories/in-memory-chemical-cargo.repository'
import { InMemoryChemicalProductRepository } from '../../../repositories/in-memory-chemical-product.repository'

function makeCreateChemicalCargoBody(
  override: Partial<CreateChemicalCargoDTO> = {},
): CreateChemicalCargoDTO {
  return {
    cargoCode: 'CARGA-003',
    productId: randomUUID(),
    quantity: 1500.5,
    unitOfMeasure: 'kg',
    cargoType: 'Granel liquido',
    origin: 'Porto de Santos',
    destination: 'Cubatao - SP',
    technicalResponsibleId: randomUUID(),
    entryDate: new Date('2026-10-29T11:30:00.000Z'),
    ...override,
  }
}

describe('CreateChemicalCargoUseCase', () => {
  let chemicalCargoRepository: InMemoryChemicalCargoRepository
  let chemicalProductRepository: InMemoryChemicalProductRepository
  let sut: CreateChemicalCargoUseCase

  beforeEach(() => {
    chemicalCargoRepository = new InMemoryChemicalCargoRepository()
    chemicalProductRepository = new InMemoryChemicalProductRepository()
    sut = new CreateChemicalCargoUseCase(
      chemicalCargoRepository,
      chemicalProductRepository,
    )
  })

  it('should register a cargo with status REGISTERED', async () => {
    const product = makeChemicalProduct()
    chemicalProductRepository.items.push(product)
    const body = createChemicalCargoBodySchema.parse(
      makeCreateChemicalCargoBody({ productId: product.id! }),
    )

    const result = await sut.handler(body)

    expect(result.cargoStatus).toBe(CargoStatus.REGISTERED)
    expect(chemicalCargoRepository.items).toHaveLength(1)
    expect(chemicalCargoRepository.items[0]).toEqual(result)
  })

  it('should block registration without an associated product id', () => {
    const { productId: _productId, ...withoutProduct } =
      makeCreateChemicalCargoBody()

    expect(
      createChemicalCargoBodySchema.safeParse(withoutProduct).success,
    ).toBe(false)
    expect(chemicalCargoRepository.items).toHaveLength(0)
  })

  it('should block registration when quantity is not greater than zero', () => {
    for (const quantity of [0, -1]) {
      const result = createChemicalCargoBodySchema.safeParse(
        makeCreateChemicalCargoBody({ quantity }),
      )

      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['quantity'],
              message: 'Quantity must be greater than zero',
            }),
          ]),
        )
      }
    }

    expect(chemicalCargoRepository.items).toHaveLength(0)
  })

  it('should block registration without a technical responsible', () => {
    const {
      technicalResponsibleId: _technicalResponsibleId,
      ...withoutResponsible
    } = makeCreateChemicalCargoBody()

    const result = createChemicalCargoBodySchema.safeParse(withoutResponsible)

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['technicalResponsibleId'],
            message: 'Technical responsible id is required',
          }),
        ]),
      )
    }

    expect(chemicalCargoRepository.items).toHaveLength(0)
  })

  it('should throw ResourceNotFoundError when the product does not exist', async () => {
    const body = createChemicalCargoBodySchema.parse(
      makeCreateChemicalCargoBody(),
    )

    await expect(sut.handler(body)).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
    expect(chemicalCargoRepository.items).toHaveLength(0)
  })

  it('should throw InactiveProductError when the product is inactive', async () => {
    const product = makeChemicalProduct({
      productStatus: ProductStatus.INACTIVE,
    })
    chemicalProductRepository.items.push(product)
    const body = createChemicalCargoBodySchema.parse(
      makeCreateChemicalCargoBody({ productId: product.id! }),
    )

    await expect(sut.handler(body)).rejects.toBeInstanceOf(InactiveProductError)
    expect(chemicalCargoRepository.items).toHaveLength(0)
  })
})
