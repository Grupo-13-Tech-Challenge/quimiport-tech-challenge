import type { IChemicalProductRepository } from '@/domain/repositories/chemical-product.repository.interface'

export class FindAllChemicalProductUseCase {
  constructor(private chemicalProductRepository: IChemicalProductRepository) {}

  async handler(page: number, limit: number) {
    return this.chemicalProductRepository.findAll(page, limit)
  }
}
