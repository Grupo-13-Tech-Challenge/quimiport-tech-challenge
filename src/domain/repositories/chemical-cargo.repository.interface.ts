import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'

export interface IChemicalCargoRepository {
  findById(id: string): Promise<IChemicalCargo | null>
  update(chemicalCargo: IChemicalCargo): Promise<IChemicalCargo>
}
