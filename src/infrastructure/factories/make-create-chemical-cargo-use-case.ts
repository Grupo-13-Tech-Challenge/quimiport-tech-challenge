import { CreateChemicalCargoUseCase } from '@/application/use-cases/create-chemical-cargo'
import { ChemicalCargoRepository } from '@/infrastructure/repositories/typeorm/chemical-cargo.repository'
import { ChemicalProductRepository } from '@/infrastructure/repositories/typeorm/chemical-product.repository'

export function makeCreateChemicalCargoUseCase() {
  const chemicalCargoRepository = new ChemicalCargoRepository()
  const chemicalProductRepository = new ChemicalProductRepository()

  return new CreateChemicalCargoUseCase(
    chemicalCargoRepository,
    chemicalProductRepository,
  )
}
