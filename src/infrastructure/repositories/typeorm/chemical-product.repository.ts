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

  create(chemicalProduct: IChemicalProduct): Promise<IChemicalProduct> {
    return this.repository.save(chemicalProduct)
  }
}
