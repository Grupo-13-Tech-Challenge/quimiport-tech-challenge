import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'
import { assertCanCancel } from '@/domain/services/cargo-status-transition'
import { z } from 'zod'

export class CancelChemicalCargoUseCase {
  constructor(private chemicalCargoRepository: IChemicalCargoRepository) {}

  async handler(id: string, _reason: string): Promise<IChemicalCargo> {
    if (!z.uuid().safeParse(id).success) {
      throw new ResourceNotFoundError()
    }

    const chemicalCargo = await this.chemicalCargoRepository.findById(id)

    if (!chemicalCargo) throw new ResourceNotFoundError()

    assertCanCancel(chemicalCargo.status)

    return this.chemicalCargoRepository.update({
      ...chemicalCargo,
      id,
      status: CargoStatus.CANCELED,
      updatedAt: new Date(),
    })
  }
}
