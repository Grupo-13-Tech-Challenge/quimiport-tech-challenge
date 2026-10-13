import { ProductStatus } from '@/domain/enums/product-status.enum'
import type { IChemicalProduct } from '@/domain/models/chemical-product.interface'
import type { IChemicalProductRepository } from '@/domain/repositories/chemical-product.repository.interface'
import type { CreateChemicalProductDTO } from '@/interfaces/dtos/create-chemical-product.dto'

export class CreateChemicalProductUseCase {
  constructor(private chemicalProductRepository: IChemicalProductRepository) {}

  async handler(data: CreateChemicalProductDTO): Promise<IChemicalProduct> {
    return this.chemicalProductRepository.create({
      ...data,
      productStatus: ProductStatus.ACTIVE,
    })
  }
}
