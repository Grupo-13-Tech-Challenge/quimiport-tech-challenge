import { makeDeactivateChemicalProductUseCase } from '@/infrastructure/factories/make-deactivate-chemical-product-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deactivate(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().trim().min(1, { message: 'Id is required' }),
  })

  const { id } = paramsSchema.parse(request.params)

  const deactivateChemicalProductUseCase =
    makeDeactivateChemicalProductUseCase()

  const chemicalProduct = await deactivateChemicalProductUseCase.handler(id)

  return reply.status(200).send(chemicalProduct)
}
