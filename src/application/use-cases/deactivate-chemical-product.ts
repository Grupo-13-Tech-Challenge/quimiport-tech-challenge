import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { ProductStatus } from '@/domain/enums/product-status.enum'
import type { IChemicalProduct } from '@/domain/models/chemical-product.interface'
import type { IChemicalProductRepository } from '@/domain/repositories/chemical-product.repository.interface'
import { z } from 'zod'

export class DeactivateChemicalProductUseCase {
  constructor(private chemicalProductRepository: IChemicalProductRepository) {}

  async handler(id: string): Promise<IChemicalProduct> {
    if (!z.uuid().safeParse(id).success) {
      throw new ResourceNotFoundError()
    }

    const chemicalProduct = await this.chemicalProductRepository.findById(id)

    if (!chemicalProduct) throw new ResourceNotFoundError()

    return this.chemicalProductRepository.update({
      ...chemicalProduct,
      id,
      productStatus: ProductStatus.INACTIVE,
      updatedAt: new Date(),
    })
  }
}
