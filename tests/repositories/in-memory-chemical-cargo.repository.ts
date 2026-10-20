import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'

export class InMemoryChemicalCargoRepository implements IChemicalCargoRepository {
  public items: IChemicalCargo[] = []

  async findAll(page: number, limit: number): Promise<IChemicalCargo[]> {
    return this.items.slice((page - 1) * limit, page * limit)
  }

  async findById(id: string): Promise<IChemicalCargo | null> {
    return this.items.find((item) => item.id === id) ?? null
  }
}
