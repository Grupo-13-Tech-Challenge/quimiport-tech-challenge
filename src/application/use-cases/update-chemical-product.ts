import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import type { IChemicalProduct } from '@/domain/models/chemical-product.interface'
import type { IChemicalProductRepository } from '@/domain/repositories/chemical-product.repository.interface'
import type { UpdateChemicalProductDTO } from '@/interfaces/dtos/update-chemical-product.dto'
import { z } from 'zod'

export class UpdateChemicalProductUseCase {
  constructor(private chemicalProductRepository: IChemicalProductRepository) {}

  async handler(
    id: string,
    data: UpdateChemicalProductDTO,
  ): Promise<IChemicalProduct> {
    if (!z.uuid().safeParse(id).success) {
      throw new ResourceNotFoundError()
    }

    const chemicalProduct = await this.chemicalProductRepository.findById(id)

    if (!chemicalProduct) throw new ResourceNotFoundError()

    return this.chemicalProductRepository.update({
      ...chemicalProduct,
      ...data,
      id,
      updatedAt: new Date(),
    })
  }
}
