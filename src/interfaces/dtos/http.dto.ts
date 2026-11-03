import { z } from 'zod'

export const idParamSchema = z
  .object({
    id: z.string().trim().min(1, { message: 'Id is required' }),
  })
  .meta({
    examples: [{ id: '5b48ce34-3cce-47ca-8892-51582632555c' }],
  })

export const paginationQuerySchema = z
  .object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
  })
  .meta({
    examples: [{ page: 1, limit: 10 }],
  })
