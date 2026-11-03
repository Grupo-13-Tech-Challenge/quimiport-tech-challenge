import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { UpdateChemicalCargoStatusUseCase } from '@/application/use-cases/update-chemical-cargo-status'
import { InvalidStatusTransitionError } from '@/domain/errors/invalid-status-transition-error'
import { MissingRequiredDocumentationError } from '@/domain/errors/missing-required-documentation-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import { makeChemicalCargo } from '../../../factories/make-chemical-cargo'
import { InMemoryChemicalCargoRepository } from '../../../repositories/in-memory-chemical-cargo.repository'

describe('UpdateChemicalCargoStatusUseCase', () => {
  let chemicalCargoRepository: InMemoryChemicalCargoRepository
  let sut: UpdateChemicalCargoStatusUseCase

  beforeEach(() => {
    chemicalCargoRepository = new InMemoryChemicalCargoRepository()
    sut = new UpdateChemicalCargoStatusUseCase(chemicalCargoRepository)
  })

  it('should move a registered cargo to analysis', async () => {
    const cargo = makeChemicalCargo({ cargoStatus: CargoStatus.REGISTERED })
    chemicalCargoRepository.items.push(cargo)

    const result = await sut.handler(cargo.id!, CargoStatus.UNDER_ANALYSIS)

    expect(result.cargoStatus).toBe(CargoStatus.UNDER_ANALYSIS)
    expect(chemicalCargoRepository.items[0]?.cargoStatus).toBe(
      CargoStatus.UNDER_ANALYSIS,
    )
  })

  it('should throw ResourceNotFoundError when cargo does not exist', async () => {
    await expect(
      sut.handler(randomUUID(), CargoStatus.CANCELED),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should throw ResourceNotFoundError when id is not a valid uuid', async () => {
    await expect(
      sut.handler('abc', CargoStatus.CANCELED),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should release a cargo in inspection when documentation is valid', async () => {
    const cargo = makeChemicalCargo({
      cargoStatus: CargoStatus.UNDER_INSPECTION,
    })
    chemicalCargoRepository.items.push(cargo)
    chemicalCargoRepository.documents.push({
      cargoId: cargo.id!,
      validationStatus: 'VALID',
    })

    const result = await sut.handler(cargo.id!, CargoStatus.RELEASED)

    expect(result.cargoStatus).toBe(CargoStatus.RELEASED)
  })

  it('should reject release through status without valid documentation', async () => {
    const cargo = makeChemicalCargo({
      cargoStatus: CargoStatus.UNDER_INSPECTION,
    })
    chemicalCargoRepository.items.push(cargo)

    await expect(
      sut.handler(cargo.id!, CargoStatus.RELEASED),
    ).rejects.toBeInstanceOf(MissingRequiredDocumentationError)
    expect(chemicalCargoRepository.items[0]?.cargoStatus).toBe(
      CargoStatus.UNDER_INSPECTION,
    )
  })

  it('should reject moving a blocked cargo', async () => {
    const cargo = makeChemicalCargo({ cargoStatus: CargoStatus.BLOCKED })
    chemicalCargoRepository.items.push(cargo)

    await expect(
      sut.handler(cargo.id!, CargoStatus.IN_TRANSIT),
    ).rejects.toBeInstanceOf(InvalidStatusTransitionError)
    expect(chemicalCargoRepository.items[0]?.cargoStatus).toBe(
      CargoStatus.BLOCKED,
    )
  })
})
