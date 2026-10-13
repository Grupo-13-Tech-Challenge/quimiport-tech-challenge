import { ProductStatus } from '@/domain/enums/product-status.enum'
import type { IChemicalProduct } from '@/domain/models/chemical-product.interface'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('chemical_product')
export class ChemicalProduct implements IChemicalProduct {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id?: string

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string

  @Column({
    name: 'description',
    type: 'text',
  })
  description: string

  @Column({
    name: 'chemical_formula',
    type: 'varchar',
  })
  chemicalFormula: string

  @Column({
    name: 'onu_number',
    type: 'varchar',
  })
  onuNumber: string

  @Column({
    name: 'risk_class',
    type: 'varchar',
  })
  riskClass: string

  @Column({
    name: 'compatibility_group',
    type: 'varchar',
  })
  compatibilityGroup: string

  @Column({
    name: 'status',
    type: 'enum',
    enum: ProductStatus,
    enumName: 'product_status',
    default: ProductStatus.ACTIVE,
  })
  productStatus?: ProductStatus

  @Column({
    name: 'created_at',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date

  @Column({
    name: 'updated_at',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date
}
