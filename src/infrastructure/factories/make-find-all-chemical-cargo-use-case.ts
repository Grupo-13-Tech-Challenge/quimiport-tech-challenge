import { FindAllChemicalCargoUseCase } from '@/application/use-cases/find-all-chemical-cargo'
import { ChemicalCargoRepository } from '@/infrastructure/repositories/typeorm/chemical-cargo.repository'

export function makeFindAllChemicalCargoUseCase() {
  const chemicalCargoRepository = new ChemicalCargoRepository()
  const findAllChemicalCargoUseCase = new FindAllChemicalCargoUseCase(
    chemicalCargoRepository,
  )
  return findAllChemicalCargoUseCase
}
