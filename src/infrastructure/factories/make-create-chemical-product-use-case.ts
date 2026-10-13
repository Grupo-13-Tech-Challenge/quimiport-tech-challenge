import { CreateChemicalProductUseCase } from '@/application/use-cases/create-chemical-product'
import { ChemicalProductRepository } from '@/infrastructure/repositories/typeorm/chemical-product.repository'

export function makeCreateChemicalProductUseCase() {
  const repository = new ChemicalProductRepository()
  return new CreateChemicalProductUseCase(repository)
}
