import type { IChemicalProduct } from '@/domain/models/chemical-product.interface'

export interface IChemicalProductRepository {
  create(chemicalProduct: IChemicalProduct): Promise<IChemicalProduct>
  findById(id: string): Promise<IChemicalProduct | null>
}
