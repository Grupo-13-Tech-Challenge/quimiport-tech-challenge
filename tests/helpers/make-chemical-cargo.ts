import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'

export function makeChemicalCargo(
  overrides: Partial<IChemicalCargo> = {},
): IChemicalCargo {
  return {
    id: '620112b9-0ae5-4e92-b601-63f7dcc26b1b',
    cargoCode: 'CQ-001',
    productId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    quantity: 100,
    unitOfMeasure: 'kg',
    cargoType: 'bulk',
    origin: 'Santos',
    destination: 'Cubatao',
    technicalResponsibleId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    status: CargoStatus.UNDER_INSPECTION,
    entryDate: new Date('2026-01-15T10:00:00.000Z'),
    createdAt: new Date('2026-01-15T10:00:00.000Z'),
    updatedAt: new Date('2026-01-15T10:00:00.000Z'),
    ...overrides,
  }
}
