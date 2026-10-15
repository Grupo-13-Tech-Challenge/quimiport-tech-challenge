import { FindChemicalProductUseCase } from '@/application/use-cases/find-chemical-product'
import { ChemicalProductRepository } from '@/infrastructure/repositories/typeorm/chemical-product.repository'

export function makeFindChemicalProductUseCase() {
  const chemicalProductRepository = new ChemicalProductRepository()
  const findChemicalProductUseCase = new FindChemicalProductUseCase(
    chemicalProductRepository,
  )
  return findChemicalProductUseCase
}
