import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import type { IChemicalProductRepository } from '@/domain/repositories/chemical-product.repository.interface'
import { z } from 'zod'

export class FindChemicalProductUseCase {
  constructor(private chemicalProductRepository: IChemicalProductRepository) {}

  async handler(id: string) {
    if (!z.uuid().safeParse(id).success) {
      throw new ResourceNotFoundError()
    }

    const chemicalProduct = await this.chemicalProductRepository.findById(id)

    if (!chemicalProduct) throw new ResourceNotFoundError()

    return chemicalProduct
  }
}
