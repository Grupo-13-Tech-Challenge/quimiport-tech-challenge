import { z } from 'zod'

export const createChemicalProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  chemicalFormula: z.string(),
  onuNumber: z.string(),
  riskClass: z.string(),
  compatibilityGroup: z.string(),
})

export type CreateChemicalProductDTO = z.infer<
  typeof createChemicalProductBodySchema
>
