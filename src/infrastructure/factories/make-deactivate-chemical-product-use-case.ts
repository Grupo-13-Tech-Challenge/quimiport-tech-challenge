import { DeactivateChemicalProductUseCase } from '@/application/use-cases/deactivate-chemical-product'
import { ChemicalProductRepository } from '@/infrastructure/repositories/typeorm/chemical-product.repository'

export function makeDeactivateChemicalProductUseCase() {
  const repository = new ChemicalProductRepository()
  return new DeactivateChemicalProductUseCase(repository)
}
