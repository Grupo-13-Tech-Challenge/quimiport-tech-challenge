import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import type { IChemicalCargoRepository } from '@/domain/repositories/chemical-cargo.repository.interface'

export class InMemoryChemicalCargoRepository implements IChemicalCargoRepository {
  public items: IChemicalCargo[] = []

  public documents: {
    cargoId: string
    validationStatus: 'PENDING' | 'VALID' | 'INVALID' | 'EXPIRED'
    expirationDate?: Date | null
  }[] = []

  async findAll(page: number, limit: number): Promise<IChemicalCargo[]> {
    return this.items.slice((page - 1) * limit, page * limit)
  }

  async findById(id: string): Promise<IChemicalCargo | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async hasValidRequiredDocumentation(cargoId: string): Promise<boolean> {
    const documents = this.documents.filter((document) => {
      return document.cargoId === cargoId
    })

    if (documents.length === 0) return false

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return documents.every((document) => {
      const isExpired =
        document.expirationDate != null && document.expirationDate < today

      return document.validationStatus === 'VALID' && !isExpired
    })
  }

  async update(chemicalCargo: IChemicalCargo): Promise<IChemicalCargo> {
    const index = this.items.findIndex((item) => item.id === chemicalCargo.id)

    if (index === -1) {
      this.items.push(chemicalCargo)
      return chemicalCargo
    }

    this.items[index] = chemicalCargo
    return chemicalCargo
  }
}
