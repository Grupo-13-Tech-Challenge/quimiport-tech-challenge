import { ChemicalProduct } from '@/domain/entities/chemical-product.entity'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import type { IChemicalCargo } from '@/domain/models/chemical-cargo.interface'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('chemical_cargo')
export class ChemicalCargo implements IChemicalCargo {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id?: string

  @Column({
    name: 'cargo_code',
    type: 'varchar',
  })
  cargoCode: string

  @Column({
    name: 'product_id',
    type: 'uuid',
  })
  productId: string

  @ManyToOne(() => ChemicalProduct)
  @JoinColumn({ name: 'product_id' })
  product?: ChemicalProduct

  // NUMERIC chega do Postgres como string; o transformer converte para number
  @Column({
    name: 'quantity',
    type: 'numeric',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  quantity: number

  @Column({
    name: 'unit_of_measure',
    type: 'varchar',
  })
  unitOfMeasure: string

  @Column({
    name: 'cargo_type',
    type: 'varchar',
    nullable: true,
  })
  cargoType?: string

  @Column({
    name: 'origin',
    type: 'varchar',
  })
  origin: string

  @Column({
    name: 'destination',
    type: 'varchar',
  })
  destination: string

  @Column({
    name: 'technical_responsible_id',
    type: 'uuid',
  })
  technicalResponsibleId: string

  @Column({
    name: 'status',
    type: 'enum',
    enum: CargoStatus,
    enumName: 'cargo_status',
    default: CargoStatus.REGISTERED,
  })
  cargoStatus?: CargoStatus

  @Column({
    name: 'entry_date',
    type: 'timestamp without time zone',
  })
  entryDate: Date

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
