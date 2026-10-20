import { randomUUID } from 'node:crypto'
import type { IChemicalProduct } from '@/domain/models/chemical-product.interface'
import type { IChemicalProductRepository } from '@/domain/repositories/chemical-product.repository.interface'

export class InMemoryChemicalProductRepository implements IChemicalProductRepository {
  public items: IChemicalProduct[] = []

  async create(chemicalProduct: IChemicalProduct): Promise<IChemicalProduct> {
    const product: IChemicalProduct = {
      ...chemicalProduct,
      id: chemicalProduct.id ?? randomUUID(),
    }

    this.items.push(product)

    return product
  }

  async findAll(page: number, limit: number): Promise<IChemicalProduct[]> {
    return this.items.slice((page - 1) * limit, page * limit)
  }

  async findById(id: string): Promise<IChemicalProduct | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async update(chemicalProduct: IChemicalProduct): Promise<IChemicalProduct> {
    const index = this.items.findIndex((item) => item.id === chemicalProduct.id)

    this.items[index] = chemicalProduct

    return chemicalProduct
  }
}
