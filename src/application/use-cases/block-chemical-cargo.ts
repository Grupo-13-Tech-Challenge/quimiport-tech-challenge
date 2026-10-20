import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'
import { assertCanBlock } from '@/domain/services/cargo-status-transition'
import { z } from 'zod'

export class BlockChemicalCargoUseCase {
  constructor(private chemicalCargoRepository: IChemicalCargoRepository) {}

  async handler(id: string, _reason: string): Promise<IChemicalCargo> {
    if (!z.uuid().safeParse(id).success) {
      throw new ResourceNotFoundError()
    }

    const chemicalCargo = await this.chemicalCargoRepository.findById(id)

    if (!chemicalCargo) throw new ResourceNotFoundError()

    assertCanBlock(chemicalCargo.cargoStatus)

    return this.chemicalCargoRepository.update({
      ...chemicalCargo,
      id,
      cargoStatus: CargoStatus.BLOCKED,
      updatedAt: new Date(),
    })
  }
}
