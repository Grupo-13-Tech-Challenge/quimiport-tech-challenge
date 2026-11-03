import { randomUUID } from 'node:crypto'
import { ProductStatus } from '@/domain/enums/product-status.enum'
import type { IChemicalProduct } from '@/domain/models/chemical-product.interface'

export function makeChemicalProduct(
  override: Partial<IChemicalProduct> = {},
): IChemicalProduct {
  return {
    id: randomUUID(),
    name: 'Hidróxido de Sódio',
    description: 'Base forte usada em processos de neutralização',
    chemicalFormula: 'NaOH',
    onuNumber: '1823',
    riskClass: '8',
    compatibilityGroup: 'Bases fortes',
    productStatus: ProductStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  }
}
