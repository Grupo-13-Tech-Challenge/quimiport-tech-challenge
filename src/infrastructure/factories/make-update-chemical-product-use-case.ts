import { UpdateChemicalProductUseCase } from '@/application/use-cases/update-chemical-product'
import { ChemicalProductRepository } from '@/infrastructure/repositories/typeorm/chemical-product.repository'

export function makeUpdateChemicalProductUseCase() {
  const chemicalProductRepository = new ChemicalProductRepository()
  const updateChemicalProductUseCase = new UpdateChemicalProductUseCase(
    chemicalProductRepository,
  )
  return updateChemicalProductUseCase
}
