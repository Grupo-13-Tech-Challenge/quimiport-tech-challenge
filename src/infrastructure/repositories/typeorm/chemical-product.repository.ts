import { ChemicalProduct } from '@/domain/entities/chemical-product.entity'
import type { IChemicalProduct } from '@/domain/models/chemical-product.interface'
import { appDataSource } from '@/infrastructure/database/typeorm'
import type { IChemicalProductRepository } from '@/domain/repositories/chemical-product.repository.interface'
import type { Repository } from 'typeorm'

export class ChemicalProductRepository implements IChemicalProductRepository {
  private repository: Repository<ChemicalProduct>

  constructor() {
    this.repository = appDataSource.getRepository(ChemicalProduct)
  }

  findAll(page: number, limit: number): Promise<IChemicalProduct[]> {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async findById(id: string): Promise<IChemicalProduct | null> {
    return this.repository.findOne({
      where: { id },
    })
  }

  async create(chemicalProduct: IChemicalProduct): Promise<IChemicalProduct> {
    return this.repository.save(chemicalProduct)
  }

  async update(chemicalProduct: IChemicalProduct): Promise<IChemicalProduct> {
    return this.repository.save(chemicalProduct)
  }
}
