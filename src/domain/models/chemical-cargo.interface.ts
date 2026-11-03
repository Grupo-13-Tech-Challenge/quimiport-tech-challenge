import type { CargoStatus } from '@/domain/enums/cargo-status.enum'
import type { IChemicalProduct } from '@/domain/models/chemical-product.interface'

export interface IChemicalCargo {
  id?: string
  cargoCode: string
  productId: string
  product?: IChemicalProduct
  quantity: number
  unitOfMeasure: string
  cargoType?: string
  origin: string
  destination: string
  technicalResponsibleId: string
  cargoStatus?: CargoStatus
  entryDate: Date
  createdAt?: Date
  updatedAt?: Date
}
