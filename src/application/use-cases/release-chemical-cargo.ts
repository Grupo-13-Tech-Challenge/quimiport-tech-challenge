import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import { MissingRequiredDocumentationError } from '@/domain/errors/missing-required-documentation-error'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'
import { assertCanRelease } from '@/domain/services/cargo-status-transition'
import { z } from 'zod'

export class ReleaseChemicalCargoUseCase {
  constructor(private chemicalCargoRepository: IChemicalCargoRepository) {}

  async handler(id: string): Promise<IChemicalCargo> {
    if (!z.uuid().safeParse(id).success) {
      throw new ResourceNotFoundError()
    }

    const chemicalCargo = await this.chemicalCargoRepository.findById(id)

    if (!chemicalCargo) throw new ResourceNotFoundError()

    assertCanRelease(chemicalCargo.cargoStatus)

    const hasValidDocumentation =
      await this.chemicalCargoRepository.hasValidRequiredDocumentation(id)

    if (!hasValidDocumentation) throw new MissingRequiredDocumentationError()

    return this.chemicalCargoRepository.update({
      ...chemicalCargo,
      id,
      cargoStatus: CargoStatus.RELEASED,
      updatedAt: new Date(),
    })
  }
}
