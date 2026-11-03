import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'
import { z } from 'zod'

export class FindChemicalCargoUseCase {
  constructor(private chemicalCargoRepository: IChemicalCargoRepository) {}

  async handler(id: string) {
    if (!z.uuid().safeParse(id).success) {
      throw new ResourceNotFoundError()
    }

    const chemicalCargo = await this.chemicalCargoRepository.findById(id)

    if (!chemicalCargo) throw new ResourceNotFoundError()

    return chemicalCargo
  }
}
