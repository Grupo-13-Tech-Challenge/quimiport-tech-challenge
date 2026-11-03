import { z } from 'zod'

export const updateChemicalProductBodySchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Name is required' }),
    description: z.string(),
    chemicalFormula: z.string(),
    onuNumber: z.string(),
    riskClass: z.string().trim().min(1, { message: 'Risk class is required' }),
    compatibilityGroup: z.string(),
  })
  .meta({
    examples: [
      {
        name: 'Metanol',
        description:
          'Álcool tóxico e inflamável utilizado como solvente e matéria-prima na produção de formaldeído e combustíveis.',
        chemicalFormula: 'CH3OH',
        onuNumber: '1230',
        riskClass: '3',
        compatibilityGroup: 'Álcoois inflamáveis',
      },
    ],
  })

export type UpdateChemicalProductDTO = z.infer<
  typeof updateChemicalProductBodySchema
>
