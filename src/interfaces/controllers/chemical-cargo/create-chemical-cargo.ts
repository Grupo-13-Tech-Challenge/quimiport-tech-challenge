import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateChemicalCargoUseCase } from '@/infrastructure/factories/make-create-chemical-cargo-use-case'
import { z } from 'zod'

export async function createChemicalCargo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    cargoCode: z.string().min(1),
    productId: z.string().uuid(),
    quantity: z.number().positive(),
    unitOfMeasure: z.string().min(1),
    cargoType: z.string().optional(),
    origin: z.string().min(1),
    destination: z.string().min(1),
    technicalResponsibleId: z.string().uuid(),
    entryDate: z.coerce.date(),
  })

  const data = registerBodySchema.parse(request.body)

  const createChemicalCargoUseCase = makeCreateChemicalCargoUseCase()
  const chemicalCargo = await createChemicalCargoUseCase.handler(data)

  return reply.status(201).send(chemicalCargo)
}