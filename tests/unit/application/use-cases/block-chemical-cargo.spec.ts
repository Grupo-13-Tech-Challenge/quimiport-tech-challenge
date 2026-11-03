import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { BlockChemicalCargoUseCase } from '@/application/use-cases/block-chemical-cargo'
import { InvalidStatusTransitionError } from '@/domain/errors/invalid-status-transition-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import { makeChemicalCargo } from '../../../factories/make-chemical-cargo'
import { InMemoryChemicalCargoRepository } from '../../../repositories/in-memory-chemical-cargo.repository'

describe('BlockChemicalCargoUseCase', () => {
  let chemicalCargoRepository: InMemoryChemicalCargoRepository
  let sut: BlockChemicalCargoUseCase

  beforeEach(() => {
    chemicalCargoRepository = new InMemoryChemicalCargoRepository()
    sut = new BlockChemicalCargoUseCase(chemicalCargoRepository)
  })

  it('should block a cargo in UNDER_INSPECTION', async () => {
    const cargo = makeChemicalCargo({
      cargoStatus: CargoStatus.UNDER_INSPECTION,
    })
    chemicalCargoRepository.items.push(cargo)

    const result = await sut.handler(cargo.id!, 'Environmental risk')

    expect(result.cargoStatus).toBe(CargoStatus.BLOCKED)
    expect(chemicalCargoRepository.items[0]?.cargoStatus).toBe(
      CargoStatus.BLOCKED,
    )
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

  it('should reject blocking a cargo that is not in UNDER_INSPECTION', async () => {
    const cargo = makeChemicalCargo({ cargoStatus: CargoStatus.REGISTERED })
    chemicalCargoRepository.items.push(cargo)

    await expect(sut.handler(cargo.id!, 'reason')).rejects.toBeInstanceOf(
      InvalidStatusTransitionError,
    )
    expect(chemicalCargoRepository.items[0]?.cargoStatus).toBe(
      CargoStatus.REGISTERED,
    )
  })

  it('should reject blocking an already canceled cargo', async () => {
    const cargo = makeChemicalCargo({ cargoStatus: CargoStatus.CANCELED })
    chemicalCargoRepository.items.push(cargo)

    await expect(sut.handler(cargo.id!, 'reason')).rejects.toBeInstanceOf(
      InvalidStatusTransitionError,
    )
  })
})
