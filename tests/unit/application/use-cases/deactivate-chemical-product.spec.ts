import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { DeactivateChemicalProductUseCase } from '@/application/use-cases/deactivate-chemical-product'
import { ProductStatus } from '@/domain/enums/product-status.enum'
import { makeChemicalProduct } from '../../../factories/make-chemical-product'
import { InMemoryChemicalProductRepository } from '../../../repositories/in-memory-chemical-product.repository'

describe('DeactivateChemicalProductUseCase', () => {
  let chemicalProductRepository: InMemoryChemicalProductRepository
  let sut: DeactivateChemicalProductUseCase

  beforeEach(() => {
    chemicalProductRepository = new InMemoryChemicalProductRepository()
    sut = new DeactivateChemicalProductUseCase(chemicalProductRepository)
  })

  it('should deactivate a chemical product', async () => {
    const product = makeChemicalProduct({
      productStatus: ProductStatus.ACTIVE,
    })
    chemicalProductRepository.items.push(product)

    const result = await sut.handler(product.id!)

    expect(result).toEqual(
      expect.objectContaining({
        id: product.id,
        productStatus: ProductStatus.INACTIVE,
      }),
    )
    expect(result.updatedAt).toBeInstanceOf(Date)
    expect(chemicalProductRepository.items[0]?.productStatus).toBe(
      ProductStatus.INACTIVE,
    )
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
