import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BlockChemicalCargoUseCase } from '@/application/use-cases/block-chemical-cargo'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { InvalidStatusTransitionError } from '@/domain/errors/invalid-status-transition-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'
import { makeChemicalCargo } from '../helpers/make-chemical-cargo'

describe('BlockChemicalCargoUseCase', () => {
  let repository: IChemicalCargoRepository
  let sut: BlockChemicalCargoUseCase

  beforeEach(() => {
    repository = {
      findById: vi.fn(),
      update: vi.fn(),
    }
    sut = new BlockChemicalCargoUseCase(repository)
  })

  it('blocks a cargo in UNDER_INSPECTION', async () => {
    const load = makeChemicalCargo({ status: CargoStatus.UNDER_INSPECTION })
    const blockedLoad = {
      ...load,
      status: CargoStatus.BLOCKED,
    }

    vi.mocked(repository.findById).mockResolvedValue(load)
    vi.mocked(repository.update).mockResolvedValue(blockedLoad)

    const result = await sut.handler(load.id!, 'Risco ambiental identificado')

    expect(repository.findById).toHaveBeenCalledWith(load.id)
    expect(repository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: load.id,
        status: CargoStatus.BLOCKED,
      }),
    )
    expect(result.status).toBe(CargoStatus.BLOCKED)
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

  it('rejects blocking a cargo that is not in UNDER_INSPECTION', async () => {
    const load = makeChemicalCargo({ status: CargoStatus.REGISTERED })
    vi.mocked(repository.findById).mockResolvedValue(load)

    await expect(sut.handler(load.id!, 'motivo')).rejects.toBeInstanceOf(
      InvalidStatusTransitionError,
    )
    expect(repository.update).not.toHaveBeenCalled()
  })

  it('rejects blocking an already cancelled load', async () => {
    const load = makeChemicalCargo({ status: CargoStatus.CANCELED })
    vi.mocked(repository.findById).mockResolvedValue(load)

    await expect(sut.handler(load.id!, 'motivo')).rejects.toBeInstanceOf(
      InvalidStatusTransitionError,
    )
  })
})
