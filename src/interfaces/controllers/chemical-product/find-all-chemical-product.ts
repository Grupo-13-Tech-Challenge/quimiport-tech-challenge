import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindAllChemicalProductUseCase } from '@/infrastructure/factories/make-find-all-chemical-product-use-case'
import { z } from 'zod'

export async function findAllChemicalProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
  })

  const { page, limit } = registerQuerySchema.parse(request.query)

  const findAllChemicalProductUseCase = makeFindAllChemicalProductUseCase()

  const chemicalProducts = await findAllChemicalProductUseCase.handler(
    page,
    limit,
  )

  return reply.status(200).send(chemicalProducts)
}
