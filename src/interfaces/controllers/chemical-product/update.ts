import { makeUpdateChemicalProductUseCase } from '@/infrastructure/factories/make-update-chemical-product-use-case'
import { updateChemicalProductBodySchema } from '@/interfaces/dtos/update-chemical-product.dto'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().trim().min(1, { message: 'Id is required' }),
  })

  const { id } = paramsSchema.parse(request.params)
  const body = updateChemicalProductBodySchema.parse(request.body)

  const updateChemicalProductUseCase = makeUpdateChemicalProductUseCase()

  const chemicalProduct = await updateChemicalProductUseCase.handler(id, body)

  return reply.status(200).send(chemicalProduct)
}
