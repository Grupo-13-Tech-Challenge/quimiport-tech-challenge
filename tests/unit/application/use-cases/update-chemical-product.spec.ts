import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { UpdateChemicalProductUseCase } from '@/application/use-cases/update-chemical-product'
import { ProductStatus } from '@/domain/enums/product-status.enum'
import {
  updateChemicalProductBodySchema,
  type UpdateChemicalProductDTO,
} from '@/interfaces/dtos/update-chemical-product.dto'
import { makeChemicalProduct } from '../../../factories/make-chemical-product'
import { InMemoryChemicalProductRepository } from '../../../repositories/in-memory-chemical-product.repository'

function makeUpdateChemicalProductBody(
  override: Partial<UpdateChemicalProductDTO> = {},
): UpdateChemicalProductDTO {
  return {
    name: 'Ácido Sulfúrico Atualizado',
    description: 'Ácido forte utilizado em processos industriais',
    chemicalFormula: 'H2SO4',
    onuNumber: '1830',
    riskClass: '8',
    compatibilityGroup: 'Ácidos fortes',
    ...override,
  }
}

describe('UpdateChemicalProductUseCase', () => {
  let chemicalProductRepository: InMemoryChemicalProductRepository
  let sut: UpdateChemicalProductUseCase

  beforeEach(() => {
    chemicalProductRepository = new InMemoryChemicalProductRepository()
    sut = new UpdateChemicalProductUseCase(chemicalProductRepository)
  })

  it('should update a chemical product', async () => {
    const product = makeChemicalProduct()
    chemicalProductRepository.items.push(product)

    const data = updateChemicalProductBodySchema.parse(
      makeUpdateChemicalProductBody(),
    )

    const result = await sut.handler(product.id!, data)

    expect(result).toEqual(
      expect.objectContaining({
        id: product.id,
        ...data,
        productStatus: ProductStatus.ACTIVE,
      }),
    )
    expect(result.updatedAt).toBeInstanceOf(Date)
    expect(chemicalProductRepository.items[0]).toEqual(result)
  })

  it('should throw ResourceNotFoundError when product does not exist', async () => {
    const data = makeUpdateChemicalProductBody()

    await expect(sut.handler(randomUUID(), data)).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should throw ResourceNotFoundError when id is not a valid uuid', async () => {
    const data = makeUpdateChemicalProductBody()

    await expect(sut.handler('abc', data)).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should block chemical product update without a name', () => {
    const product = makeChemicalProduct()
    chemicalProductRepository.items.push(product)

    for (const name of ['', '   ']) {
      const result = updateChemicalProductBodySchema.safeParse(
        makeUpdateChemicalProductBody({ name }),
      )

      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['name'],
              message: 'Name is required',
            }),
          ]),
        )
      }
    }

    const { name: _name, ...withoutName } = makeUpdateChemicalProductBody()

    expect(updateChemicalProductBodySchema.safeParse(withoutName).success).toBe(
      false,
    )
    expect(chemicalProductRepository.items[0]).toEqual(product)
  })

  it('should block chemical product update without a risk class', () => {
    const product = makeChemicalProduct()
    chemicalProductRepository.items.push(product)

    for (const riskClass of ['', '   ']) {
      const result = updateChemicalProductBodySchema.safeParse(
        makeUpdateChemicalProductBody({ riskClass }),
      )

      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['riskClass'],
              message: 'Risk class is required',
            }),
          ]),
        )
      }
    }

    const { riskClass: _riskClass, ...withoutRiskClass } =
      makeUpdateChemicalProductBody()

    expect(
      updateChemicalProductBodySchema.safeParse(withoutRiskClass).success,
    ).toBe(false)
    expect(chemicalProductRepository.items[0]).toEqual(product)
  })
})
