import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { CancelChemicalCargoUseCase } from '@/application/use-cases/cancel-chemical-cargo'
import { InvalidStatusTransitionError } from '@/domain/errors/invalid-status-transition-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import { makeChemicalCargo } from '../../../factories/make-chemical-cargo'
import { InMemoryChemicalCargoRepository } from '../../../repositories/in-memory-chemical-cargo.repository'

describe('CancelChemicalCargoUseCase', () => {
  let chemicalCargoRepository: InMemoryChemicalCargoRepository
  let sut: CancelChemicalCargoUseCase

  beforeEach(() => {
    chemicalCargoRepository = new InMemoryChemicalCargoRepository()
    sut = new CancelChemicalCargoUseCase(chemicalCargoRepository)
  })

  it.each([
    CargoStatus.REGISTERED,
    CargoStatus.UNDER_ANALYSIS,
    CargoStatus.UNDER_INSPECTION,
    CargoStatus.RELEASED,
    CargoStatus.BLOCKED,
  ])('should cancel a cargo in %s', async (cargoStatus) => {
    const cargo = makeChemicalCargo({ cargoStatus })
    chemicalCargoRepository.items.push(cargo)

    const result = await sut.handler(cargo.id!, 'Shipment withdrawn')

    expect(result.cargoStatus).toBe(CargoStatus.CANCELED)
  })

  it('should throw ResourceNotFoundError when cargo does not exist', async () => {
    await expect(sut.handler(randomUUID(), 'reason')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should throw ResourceNotFoundError when id is not a valid uuid', async () => {
    await expect(sut.handler('abc', 'reason')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it.each([
    CargoStatus.IN_TRANSIT,
    CargoStatus.COMPLETED,
    CargoStatus.CANCELED,
  ])('should reject cancel from %s', async (cargoStatus) => {
    const cargo = makeChemicalCargo({ cargoStatus })
    chemicalCargoRepository.items.push(cargo)

    await expect(sut.handler(cargo.id!, 'reason')).rejects.toBeInstanceOf(
      InvalidStatusTransitionError,
    )
    expect(chemicalCargoRepository.items[0]?.cargoStatus).toBe(cargoStatus)
  })
})
