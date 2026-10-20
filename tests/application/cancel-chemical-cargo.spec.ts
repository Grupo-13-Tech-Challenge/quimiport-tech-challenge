import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CancelChemicalCargoUseCase } from '@/application/use-cases/cancel-chemical-cargo'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { InvalidStatusTransitionError } from '@/domain/errors/invalid-status-transition-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'
import { makeChemicalCargo } from '../helpers/make-chemical-cargo'

describe('CancelChemicalCargoUseCase', () => {
  let repository: IChemicalCargoRepository
  let sut: CancelChemicalCargoUseCase

  beforeEach(() => {
    repository = {
      findById: vi.fn(),
      update: vi.fn(),
    }
    sut = new CancelChemicalCargoUseCase(repository)
  })

  it.each([
    CargoStatus.REGISTERED,
    CargoStatus.UNDER_ANALYSIS,
    CargoStatus.UNDER_INSPECTION,
    CargoStatus.RELEASED,
    CargoStatus.BLOCKED,
  ])('cancels a load in %s', async (status) => {
    const load = makeChemicalCargo({ status })
    const cancelledLoad = {
      ...load,
      status: CargoStatus.CANCELED,
    }

    vi.mocked(repository.findById).mockResolvedValue(load)
    vi.mocked(repository.update).mockResolvedValue(cancelledLoad)

    const result = await sut.handler(load.id!, 'Desistência do envio')

    expect(repository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: load.id,
        status: CargoStatus.CANCELED,
      }),
    )
    expect(result.status).toBe(CargoStatus.CANCELED)
  })

  it('throws when load does not exist', async () => {
    vi.mocked(repository.findById).mockResolvedValue(null)

    await expect(
      sut.handler('620112b9-0ae5-4e92-b601-63f7dcc26b1b', 'motivo'),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('throws when id is not a valid uuid', async () => {
    await expect(sut.handler('id-invalido', 'motivo')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
    expect(repository.findById).not.toHaveBeenCalled()
  })

  it.each([
    CargoStatus.IN_TRANSIT,
    CargoStatus.COMPLETED,
    CargoStatus.CANCELED,
  ])('rejects cancel from %s', async (status) => {
    const load = makeChemicalCargo({ status })
    vi.mocked(repository.findById).mockResolvedValue(load)

    await expect(sut.handler(load.id!, 'motivo')).rejects.toBeInstanceOf(
      InvalidStatusTransitionError,
    )
    expect(repository.update).not.toHaveBeenCalled()
  })
})
