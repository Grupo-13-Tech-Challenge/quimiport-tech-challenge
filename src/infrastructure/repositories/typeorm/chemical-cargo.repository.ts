import { ChemicalCargo } from '@/domain/entities/chemical-cargo.entity'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import { appDataSource } from '@/infrastructure/database/typeorm'
import type { CreateChemicalCargoInput, IChemicalCargoRepository,} from '@/domain/repositories/chemical-cargo.repository.interface'
import type { Repository } from 'typeorm'

export class ChemicalCargoRepository implements IChemicalCargoRepository {
  private repository: Repository<ChemicalCargo>

  constructor() {
    this.repository = appDataSource.getRepository(ChemicalCargo)
  }

  findAll(page: number, limit: number): Promise<IChemicalCargo[]> {
    return this.repository.find({
      relations: { product: true },
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async findById(id: string): Promise<IChemicalCargo | null> {
    return this.repository.findOne({
      where: { id },
      relations: { product: true },
    })
  }

  async update(chemicalCargo: IChemicalCargo): Promise<IChemicalCargo> {
    return this.repository.save(chemicalCargo)
  }

  async create(data: CreateChemicalCargoInput): Promise<IChemicalCargo> {
    const chemicalCargo = this.repository.create(data)
    return this.repository.save(chemicalCargo)
  }
  

}
