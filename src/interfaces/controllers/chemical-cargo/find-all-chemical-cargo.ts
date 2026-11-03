import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindAllChemicalCargoUseCase } from '@/infrastructure/factories/make-find-all-chemical-cargo-use-case'
import { z } from 'zod'

export async function findAllChemicalCargo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
  })

  const { page, limit } = registerQuerySchema.parse(request.query)

  const findAllChemicalCargoUseCase = makeFindAllChemicalCargoUseCase()

  const chemicalCargos = await findAllChemicalCargoUseCase.handler(page, limit)

  return reply.status(200).send(chemicalCargos)
}
