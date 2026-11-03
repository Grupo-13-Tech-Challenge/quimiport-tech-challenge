import { BlockChemicalCargoUseCase } from '@/application/use-cases/block-chemical-cargo'
import { ChemicalCargoRepository } from '@/infrastructure/repositories/typeorm/chemical-cargo.repository'

export function makeBlockChemicalCargoUseCase() {
  const repository = new ChemicalCargoRepository()
  return new BlockChemicalCargoUseCase(repository)
}
