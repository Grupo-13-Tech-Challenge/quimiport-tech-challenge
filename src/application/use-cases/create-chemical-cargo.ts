import type {
  CreateChemicalCargoInput,
  IChemicalCargoRepository,
} from '@/domain/repositories/chemical-cargo.repository.interface'

export class CreateChemicalCargoUseCase {
  constructor(private chemicalCargoRepository: IChemicalCargoRepository) {}

  async handler(data: CreateChemicalCargoInput) {
    return this.chemicalCargoRepository.create(data)
  }
}