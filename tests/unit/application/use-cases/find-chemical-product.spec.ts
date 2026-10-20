import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { FindChemicalProductUseCase } from '@/application/use-cases/find-chemical-product'
import { makeChemicalProduct } from '../../../factories/make-chemical-product'
import { InMemoryChemicalProductRepository } from '../../../repositories/in-memory-chemical-product.repository'

describe('FindChemicalProductUseCase', () => {
  let chemicalProductRepository: InMemoryChemicalProductRepository
  let sut: FindChemicalProductUseCase

  beforeEach(() => {
    chemicalProductRepository = new InMemoryChemicalProductRepository()
    sut = new FindChemicalProductUseCase(chemicalProductRepository)
  })

  it('should find a chemical product by id', async () => {
    const product = makeChemicalProduct()
    chemicalProductRepository.items.push(product)

    const result = await sut.handler(product.id!)

    expect(result).toEqual(product)
  })

  it('should throw ResourceNotFoundError when product does not exist', async () => {
    await expect(sut.handler(randomUUID())).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should throw ResourceNotFoundError when id is not a valid uuid', async () => {
    await expect(sut.handler('abc')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
