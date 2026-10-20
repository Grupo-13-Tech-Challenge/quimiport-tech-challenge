import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'

export interface IChemicalCargoRepository {
  findById(id: string): Promise<IChemicalCargo | null>
  findAll(page: number, limit: number): Promise<IChemicalCargo[]>
  update(chemicalCargo: IChemicalCargo): Promise<IChemicalCargo>
}
