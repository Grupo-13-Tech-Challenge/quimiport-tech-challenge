import { makeFindChemicalCargoUseCase } from '@/infrastructure/factories/make-find-chemical-cargo-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findChemicalCargo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParamsSchema = z.object({
    id: z.string().trim().min(1, { message: 'Id is required' }),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const findCargoUseCase = makeFindChemicalCargoUseCase()

  const chemicalCargo = await findCargoUseCase.handler(id)

  return reply.status(200).send(chemicalCargo)
}
