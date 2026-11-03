import { beforeEach, describe, expect, it } from 'vitest'
import { FindAllChemicalCargoUseCase } from '@/application/use-cases/find-all-chemical-cargo'
import { makeChemicalCargo } from '../../../factories/make-chemical-cargo'
import { InMemoryChemicalCargoRepository } from '../../../repositories/in-memory-chemical-cargo.repository'

describe('FindAllChemicalCargoUseCase', () => {
  let chemicalCargoRepository: InMemoryChemicalCargoRepository
  let sut: FindAllChemicalCargoUseCase

  beforeEach(() => {
    chemicalCargoRepository = new InMemoryChemicalCargoRepository()
    sut = new FindAllChemicalCargoUseCase(chemicalCargoRepository)
  })

  it('should list chemical cargos', async () => {
    chemicalCargoRepository.items.push(
      makeChemicalCargo({ cargoCode: 'CARGA-001' }),
      makeChemicalCargo({ cargoCode: 'CARGA-002' }),
    )

    const result = await sut.handler(1, 10)

    expect(result).toHaveLength(2)
    expect(result).toEqual([
      expect.objectContaining({ cargoCode: 'CARGA-001' }),
      expect.objectContaining({ cargoCode: 'CARGA-002' }),
    ])
  })

  it('should return an empty list when there are no cargos', async () => {
    const result = await sut.handler(1, 10)

    expect(result).toEqual([])
  })

  it('should paginate chemical cargos', async () => {
    for (let i = 1; i <= 12; i++) {
      chemicalCargoRepository.items.push(
        makeChemicalCargo({ cargoCode: `CARGA-${i}` }),
      )
    }

    const result = await sut.handler(2, 10)

    expect(result).toHaveLength(2)
    expect(result).toEqual([
      expect.objectContaining({ cargoCode: 'CARGA-11' }),
      expect.objectContaining({ cargoCode: 'CARGA-12' }),
    ])
  })
})
