import { randomUUID } from 'node:crypto'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'

export function makeChemicalCargo(
  override: Partial<IChemicalCargo> = {},
): IChemicalCargo {
  return {
    id: randomUUID(),
    cargoCode: 'CARGA-001',
    productId: randomUUID(),
    quantity: 1500.5,
    unitOfMeasure: 'kg',
    cargoType: 'Granel liquido',
    origin: 'Porto de Santos',
    destination: 'Cubatao - SP',
    technicalResponsibleId: randomUUID(),
    cargoStatus: CargoStatus.REGISTERED,
    entryDate: new Date(),
    ...override,
  }
}
