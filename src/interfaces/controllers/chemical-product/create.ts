import { makeCreateChemicalProductUseCase } from '@/infrastructure/factories/make-create-chemical-product-use-case'
import { createChemicalProductBodySchema } from '@/interfaces/dtos/create-chemical-product.dto'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const body = createChemicalProductBodySchema.parse(request.body)

  const createChemicalProductUseCase = makeCreateChemicalProductUseCase()

  const chemicalProduct = await createChemicalProductUseCase.handler(body)

  return reply.status(201).send(chemicalProduct)
}
