import { makeFindChemicalProductUseCase } from '@/infrastructure/factories/make-find-chemical-product-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findChemicalProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParamsSchema = z.object({
    id: z.string().trim().min(1, { message: 'Id is required' }),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const findProductUseCase = makeFindChemicalProductUseCase()

  const chemicalProduct = await findProductUseCase.handler(id)

  return reply.status(200).send(chemicalProduct)
}
