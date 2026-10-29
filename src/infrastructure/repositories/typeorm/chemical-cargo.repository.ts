import { ChemicalCargo } from '@/domain/entities/chemical-cargo.entity'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import { appDataSource } from '@/infrastructure/database/typeorm'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'
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

  async hasValidRequiredDocumentation(cargoId: string): Promise<boolean> {
    const rows: { total: number; valid: number }[] = await appDataSource.query(
      `SELECT
         COUNT(*)::int AS total,
         COUNT(*) FILTER (
           WHERE validation_status = 'VALID'
             AND (expiration_date IS NULL OR expiration_date >= CURRENT_DATE)
         )::int AS valid
       FROM cargo_document
       WHERE cargo_id = $1`,
      [cargoId],
    )

    const total = Number(rows[0]?.total ?? 0)
    const valid = Number(rows[0]?.valid ?? 0)

    return total > 0 && total === valid
  }

  async update(chemicalCargo: IChemicalCargo): Promise<IChemicalCargo> {
    return this.repository.save(chemicalCargo)
  }
}
