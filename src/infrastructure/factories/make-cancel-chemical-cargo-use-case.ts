import { CancelChemicalCargoUseCase } from '@/application/use-cases/cancel-chemical-cargo'
import { ChemicalCargoRepository } from '@/infrastructure/repositories/typeorm/chemical-cargo.repository'

export function makeCancelChemicalCargoUseCase() {
  const repository = new ChemicalCargoRepository()
  return new CancelChemicalCargoUseCase(repository)
}
