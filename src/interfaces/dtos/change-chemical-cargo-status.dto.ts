import { z } from 'zod'

export const changeChemicalCargoStatusBodySchema = z
  .object({
    reason: z.string().trim().min(1, { message: 'Reason is required' }),
  })
  .meta({
    examples: [{ reason: 'Failed safety inspection' }],
  })

export type ChangeChemicalCargoStatusDTO = z.infer<
  typeof changeChemicalCargoStatusBodySchema
>
