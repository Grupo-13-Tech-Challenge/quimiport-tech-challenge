import type { IChemicalProduct } from '@/domain/models/chemical-product.interface'

export interface IChemicalProductRepository {
  create(chemicalProduct: IChemicalProduct): Promise<IChemicalProduct>
  findById(id: string): Promise<IChemicalProduct | null>
  findAll(page: number, limit: number): Promise<IChemicalProduct[]>
  update(chemicalProduct: IChemicalProduct): Promise<IChemicalProduct>
}
