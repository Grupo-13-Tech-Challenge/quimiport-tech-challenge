import { FindChemicalCargoUseCase } from '@/application/use-cases/find-chemical-cargo'
import { ChemicalCargoRepository } from '@/infrastructure/repositories/typeorm/chemical-cargo.repository'

export function makeFindChemicalCargoUseCase() {
  const chemicalCargoRepository = new ChemicalCargoRepository()
  const findChemicalCargoUseCase = new FindChemicalCargoUseCase(
    chemicalCargoRepository,
  )
  return findChemicalCargoUseCase
}
