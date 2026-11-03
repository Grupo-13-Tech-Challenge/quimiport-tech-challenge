import { UpdateChemicalCargoStatusUseCase } from '@/application/use-cases/update-chemical-cargo-status'
import { ChemicalCargoRepository } from '@/infrastructure/repositories/typeorm/chemical-cargo.repository'

export function makeUpdateChemicalCargoStatusUseCase() {
  const repository = new ChemicalCargoRepository()
  return new UpdateChemicalCargoStatusUseCase(repository)
}
