import { CreateChemicalCargoUseCase } from '@/application/use-cases/create-chemical-cargo'
import { ChemicalCargoRepository } from '@/infrastructure/repositories/typeorm/chemical-cargo.repository'

export function makeCreateChemicalCargoUseCase() {
  const chemicalCargoRepository = new ChemicalCargoRepository()
  const createChemicalCargoUseCase = new CreateChemicalCargoUseCase(
    chemicalCargoRepository,
  )
  return createChemicalCargoUseCase
}