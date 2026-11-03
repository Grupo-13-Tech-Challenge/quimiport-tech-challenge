import { beforeEach, describe, expect, it } from 'vitest'
import { FindAllChemicalProductUseCase } from '@/application/use-cases/find-all-chemical-product'
import { makeChemicalProduct } from '../../../factories/make-chemical-product'
import { InMemoryChemicalProductRepository } from '../../../repositories/in-memory-chemical-product.repository'

describe('FindAllChemicalProductUseCase', () => {
  let chemicalProductRepository: InMemoryChemicalProductRepository
  let sut: FindAllChemicalProductUseCase

  beforeEach(() => {
    chemicalProductRepository = new InMemoryChemicalProductRepository()
    sut = new FindAllChemicalProductUseCase(chemicalProductRepository)
  })

  it('should list chemical products', async () => {
    chemicalProductRepository.items.push(
      makeChemicalProduct({ name: 'Hidróxido de Sódio' }),
      makeChemicalProduct({ name: 'Ácido Sulfúrico' }),
    )

    const result = await sut.handler(1, 10)

    expect(result).toHaveLength(2)
    expect(result).toEqual([
      expect.objectContaining({ name: 'Hidróxido de Sódio' }),
      expect.objectContaining({ name: 'Ácido Sulfúrico' }),
    ])
  })

  it('should return an empty list when there are no products', async () => {
    const result = await sut.handler(1, 10)

    expect(result).toEqual([])
  })

  it('should paginate chemical products', async () => {
    for (let i = 1; i <= 12; i++) {
      chemicalProductRepository.items.push(
        makeChemicalProduct({ name: `Produto ${i}` }),
      )
    }

    const result = await sut.handler(2, 10)

    expect(result).toHaveLength(2)
    expect(result).toEqual([
      expect.objectContaining({ name: 'Produto 11' }),
      expect.objectContaining({ name: 'Produto 12' }),
    ])
  })
})
