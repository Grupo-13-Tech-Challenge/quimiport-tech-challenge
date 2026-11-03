import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { ReleaseChemicalCargoUseCase } from '@/application/use-cases/release-chemical-cargo'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import { MissingRequiredDocumentationError } from '@/domain/errors/missing-required-documentation-error'
import { InvalidStatusTransitionError } from '@/domain/errors/invalid-status-transition-error'
import { makeChemicalCargo } from '../../../factories/make-chemical-cargo'
import { InMemoryChemicalCargoRepository } from '../../../repositories/in-memory-chemical-cargo.repository'

describe('ReleaseChemicalCargoUseCase', () => {
  let chemicalCargoRepository: InMemoryChemicalCargoRepository
  let sut: ReleaseChemicalCargoUseCase

  beforeEach(() => {
    chemicalCargoRepository = new InMemoryChemicalCargoRepository()
    sut = new ReleaseChemicalCargoUseCase(chemicalCargoRepository)
  })

  it('should release a cargo in inspection with valid documentation', async () => {
    const cargo = makeChemicalCargo({
      cargoStatus: CargoStatus.UNDER_INSPECTION,
    })
    chemicalCargoRepository.items.push(cargo)
    chemicalCargoRepository.documents.push({
      cargoId: cargo.id!,
      validationStatus: 'VALID',
    })

    const result = await sut.handler(cargo.id!)

    expect(result.cargoStatus).toBe(CargoStatus.RELEASED)
    expect(chemicalCargoRepository.items[0]?.cargoStatus).toBe(
      CargoStatus.RELEASED,
    )
  })

  it('should throw ResourceNotFoundError when cargo does not exist', async () => {
    await expect(sut.handler(randomUUID())).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should throw ResourceNotFoundError when id is not a valid uuid', async () => {
    await expect(sut.handler('abc')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should reject release without valid documentation', async () => {
    const cargo = makeChemicalCargo({
      cargoStatus: CargoStatus.UNDER_INSPECTION,
    })
    chemicalCargoRepository.items.push(cargo)

    await expect(sut.handler(cargo.id!)).rejects.toBeInstanceOf(
      MissingRequiredDocumentationError,
    )
    expect(chemicalCargoRepository.items[0]?.cargoStatus).toBe(
      CargoStatus.UNDER_INSPECTION,
    )
  })

  it.each([
    CargoStatus.REGISTERED,
    CargoStatus.BLOCKED,
    CargoStatus.CANCELED,
    CargoStatus.RELEASED,
  ])('should reject release from %s', async (cargoStatus) => {
    const cargo = makeChemicalCargo({ cargoStatus })
    chemicalCargoRepository.items.push(cargo)
    chemicalCargoRepository.documents.push({
      cargoId: cargo.id!,
      validationStatus: 'VALID',
    })

    await expect(sut.handler(cargo.id!)).rejects.toBeInstanceOf(
      InvalidStatusTransitionError,
    )
  })
})
