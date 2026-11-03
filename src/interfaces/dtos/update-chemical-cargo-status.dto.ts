import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import { z } from 'zod'

export const updateChemicalCargoStatusBodySchema = z
  .object({
    status: z.enum(CargoStatus, { message: 'Status is required' }),
  })
  .meta({
    examples: [{ status: CargoStatus.UNDER_INSPECTION }],
  })

export type UpdateChemicalCargoStatusDTO = z.infer<
  typeof updateChemicalCargoStatusBodySchema
>
