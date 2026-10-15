import { z } from 'zod'

export const createChemicalProductBodySchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  description: z.string(),
  chemicalFormula: z.string(),
  onuNumber: z.string(),
  riskClass: z.string().trim().min(1, { message: 'Risk class is required' }),
  compatibilityGroup: z.string(),
})

export type CreateChemicalProductDTO = z.infer<
  typeof createChemicalProductBodySchema
>
