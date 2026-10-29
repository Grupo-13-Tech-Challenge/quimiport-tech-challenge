import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'

export type CreateChemicalCargoInput = Omit<
  IChemicalCargo,
  'id' | 'product' | 'createdAt' | 'updatedAt'
>

export interface IChemicalCargoRepository {
  findAll(page: number, limit: number): Promise<IChemicalCargo[]>
  findById(id: string): Promise<IChemicalCargo | null>
  hasValidRequiredDocumentation(cargoId: string): Promise<boolean>
  update(chemicalCargo: IChemicalCargo): Promise<IChemicalCargo>
  create(data: CreateChemicalCargoInput): Promise<IChemicalCargo>
}
