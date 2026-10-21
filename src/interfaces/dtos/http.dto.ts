import { z } from 'zod'

export const idParamSchema = z.object({
  id: z.string().trim().min(1, { message: 'Id is required' }),
})

export const paginationQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
})
