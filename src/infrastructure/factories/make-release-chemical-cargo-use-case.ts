import { ReleaseChemicalCargoUseCase } from '@/application/use-cases/release-chemical-cargo'
import { ChemicalCargoRepository } from '@/infrastructure/repositories/typeorm/chemical-cargo.repository'

export function makeReleaseChemicalCargoUseCase() {
  const repository = new ChemicalCargoRepository()
  return new ReleaseChemicalCargoUseCase(repository)
}
