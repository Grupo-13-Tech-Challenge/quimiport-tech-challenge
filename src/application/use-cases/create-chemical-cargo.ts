import { ResourceNotFoundError } from '@/application/errors/resource-not-found-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import { ProductStatus } from '@/domain/enums/product-status.enum'
import { InactiveProductError } from '@/domain/errors/inactive-product-error'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'
import type { IChemicalProductRepository } from '@/domain/repositories/chemical-product.repository.interface'
import type { CreateChemicalCargoDTO } from '@/interfaces/dtos/create-chemical-cargo.dto'

export class CreateChemicalCargoUseCase {
  constructor(
    private chemicalCargoRepository: IChemicalCargoRepository,
    private chemicalProductRepository: IChemicalProductRepository,
  ) {}

  async handler(data: CreateChemicalCargoDTO): Promise<IChemicalCargo> {
    const product = await this.chemicalProductRepository.findById(
      data.productId,
    )

    if (!product) throw new ResourceNotFoundError()

    if (product.productStatus !== ProductStatus.ACTIVE) {
      throw new InactiveProductError()
    }

    return this.chemicalCargoRepository.create({
      ...data,
      cargoStatus: CargoStatus.REGISTERED,
    })
  }
}
