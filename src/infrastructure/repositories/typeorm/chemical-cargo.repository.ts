import { ChemicalCargo } from '@/domain/entities/chemical-cargo.entity'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'
import { appDataSource } from '@/infrastructure/database/typeorm'
import type { Repository } from 'typeorm'

export class ChemicalCargoRepository implements IChemicalCargoRepository {
  private repository: Repository<ChemicalCargo>

  constructor() {
    this.repository = appDataSource.getRepository(ChemicalCargo)
  }

  async findById(id: string): Promise<IChemicalCargo | null> {
    return this.repository.findOne({
      where: { id },
    })
  }

  async update(chemicalCargo: IChemicalCargo): Promise<IChemicalCargo> {
    return this.repository.save(chemicalCargo)
  }
}
