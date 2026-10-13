import type { ProductStatus } from '@/domain/enums/product-status.enum'

export interface IChemicalProduct {
  id?: string
  name: string
  description: string
  chemicalFormula: string
  onuNumber: string
  riskClass: string
  compatibilityGroup: string
  productStatus?: ProductStatus
  createdAt?: Date
  updatedAt?: Date
}
