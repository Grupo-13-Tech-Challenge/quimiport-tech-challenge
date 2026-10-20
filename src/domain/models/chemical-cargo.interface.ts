import type { CargoStatus } from '@/domain/enums/cargo-status.enum'

export interface IChemicalCargo {
  id?: string
  cargoCode: string
  productId: string
  quantity: number
  unitOfMeasure: string
  cargoType?: string | null
  origin: string
  destination: string
  technicalResponsibleId: string
  status: CargoStatus
  entryDate: Date
  createdAt?: Date
  updatedAt?: Date
}
