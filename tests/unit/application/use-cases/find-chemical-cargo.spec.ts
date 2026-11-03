import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { FindChemicalCargoUseCase } from '@/application/use-cases/find-chemical-cargo'
import { makeChemicalCargo } from '../../../factories/make-chemical-cargo'
import { InMemoryChemicalCargoRepository } from '../../../repositories/in-memory-chemical-cargo.repository'

describe('FindChemicalCargoUseCase', () => {
  let chemicalCargoRepository: InMemoryChemicalCargoRepository
  let sut: FindChemicalCargoUseCase

  beforeEach(() => {
    chemicalCargoRepository = new InMemoryChemicalCargoRepository()
    sut = new FindChemicalCargoUseCase(chemicalCargoRepository)
  })

  it('should find a chemical cargo by id', async () => {
    const cargo = makeChemicalCargo()
    chemicalCargoRepository.items.push(cargo)

    const result = await sut.handler(cargo.id!)

    expect(result).toEqual(cargo)
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
})
