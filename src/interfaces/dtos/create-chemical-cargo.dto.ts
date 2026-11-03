import { z } from 'zod'

export const createChemicalCargoBodySchema = z
  .object({
    cargoCode: z.string().trim().min(1, { message: 'Cargo code is required' }),
    productId: z.uuid({ message: 'Product id is required' }),
    quantity: z
      .number()
      .positive({ message: 'Quantity must be greater than zero' }),
    unitOfMeasure: z
      .string()
      .trim()
      .min(1, { message: 'Unit of measure is required' }),
    cargoType: z.string().trim().min(1).optional(),
    origin: z.string().trim().min(1, { message: 'Origin is required' }),
    destination: z
      .string()
      .trim()
      .min(1, { message: 'Destination is required' }),
    technicalResponsibleId: z.uuid({
      message: 'Technical responsible id is required',
    }),
    entryDate: z.coerce.date(),
  })
  .meta({
    examples: [
      {
        cargoCode: 'CARGA-003',
        productId: '5b48ce34-3cce-47ca-8892-51582632555c',
        quantity: 1500.5,
        unitOfMeasure: 'kg',
        cargoType: 'Granel liquido',
        origin: 'Porto de Santos',
        destination: 'Cubatao - SP',
        technicalResponsibleId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        entryDate: '2026-10-29T11:30:00.000Z',
      },
    ],
  })

export type CreateChemicalCargoDTO = z.infer<
  typeof createChemicalCargoBodySchema
>
