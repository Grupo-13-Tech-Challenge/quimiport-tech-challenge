import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'

export class FindAllChemicalCargoUseCase {
  constructor(private chemicalCargoRepository: IChemicalCargoRepository) {}

  async handler(page: number, limit: number) {
    return this.chemicalCargoRepository.findAll(page, limit)
  }
}
