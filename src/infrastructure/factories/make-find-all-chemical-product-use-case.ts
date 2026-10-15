import { FindAllChemicalProductUseCase } from '@/application/use-cases/find-all-chemical-product'
import { ChemicalProductRepository } from '@/infrastructure/repositories/typeorm/chemical-product.repository'

export function makeFindAllChemicalProductUseCase() {
  const chemicalProductRepository = new ChemicalProductRepository()
  const findChemicalProductUseCase = new FindAllChemicalProductUseCase(
    chemicalProductRepository,
  )
  return findChemicalProductUseCase
}
