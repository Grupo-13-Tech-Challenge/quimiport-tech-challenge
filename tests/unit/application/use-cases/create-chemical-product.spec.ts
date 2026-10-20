import { beforeEach, describe, expect, it } from 'vitest'
import { CreateChemicalProductUseCase } from '@/application/use-cases/create-chemical-product'
import { ProductStatus } from '@/domain/enums/product-status.enum'
import {
  createChemicalProductBodySchema,
  type CreateChemicalProductDTO,
} from '@/interfaces/dtos/create-chemical-product.dto'
import { InMemoryChemicalProductRepository } from '../../../repositories/in-memory-chemical-product.repository'

function makeCreateChemicalProductBody(
  override: Partial<CreateChemicalProductDTO> = {},
): CreateChemicalProductDTO {
  return {
    name: 'Hidróxido de Sódio',
    description: 'Base forte usada em processos de neutralização',
    chemicalFormula: 'NaOH',
    onuNumber: '1823',
    riskClass: '8',
    compatibilityGroup: 'Bases fortes',
    ...override,
  }
}

describe('CreateChemicalProductUseCase', () => {
  let chemicalProductRepository: InMemoryChemicalProductRepository
  let sut: CreateChemicalProductUseCase

  beforeEach(() => {
    chemicalProductRepository = new InMemoryChemicalProductRepository()
    sut = new CreateChemicalProductUseCase(chemicalProductRepository)
  })

  it('should register a chemical product', async () => {
    const body = createChemicalProductBodySchema.parse(
      makeCreateChemicalProductBody(),
    )

    const result = await sut.handler(body)

    expect(result).toEqual(
      expect.objectContaining({
        ...body,
        productStatus: ProductStatus.ACTIVE,
      }),
    )
    expect(chemicalProductRepository.items).toHaveLength(1)
    expect(chemicalProductRepository.items[0]).toEqual(result)
  })

  it('should block chemical product registration without a name', () => {
    for (const name of ['', '   ']) {
      const result = createChemicalProductBodySchema.safeParse(
        makeCreateChemicalProductBody({ name }),
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

    const { name: _name, ...withoutName } = makeCreateChemicalProductBody()

    expect(createChemicalProductBodySchema.safeParse(withoutName).success).toBe(
      false,
    )
    expect(chemicalProductRepository.items).toHaveLength(0)
  })

  it('should block chemical product registration without a risk class', () => {
    for (const riskClass of ['', '   ']) {
      const result = createChemicalProductBodySchema.safeParse(
        makeCreateChemicalProductBody({ riskClass }),
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
      makeCreateChemicalProductBody()

    expect(
      createChemicalProductBodySchema.safeParse(withoutRiskClass).success,
    ).toBe(false)
    expect(chemicalProductRepository.items).toHaveLength(0)
  })
})
