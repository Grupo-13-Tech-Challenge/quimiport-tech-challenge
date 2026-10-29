import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import type { CargoStatus } from '@/domain/enums/cargo-status.enum'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'
import { assertCanChangeStatus } from '@/domain/services/cargo-status-transition'
import { z } from 'zod'

export class UpdateChemicalCargoStatusUseCase {
  constructor(private chemicalCargoRepository: IChemicalCargoRepository) {}

  async handler(id: string, status: CargoStatus): Promise<IChemicalCargo> {
    if (!z.uuid().safeParse(id).success) {
      throw new ResourceNotFoundError()
    }

    const chemicalCargo = await this.chemicalCargoRepository.findById(id)

    if (!chemicalCargo) throw new ResourceNotFoundError()

    assertCanChangeStatus(chemicalCargo.cargoStatus, status)

    return this.chemicalCargoRepository.update({
      ...chemicalCargo,
      id,
      cargoStatus: status,
      updatedAt: new Date(),
    })
  }
}
