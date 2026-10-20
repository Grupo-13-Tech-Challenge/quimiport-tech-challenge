import { makeCancelChemicalCargoUseCase } from '@/infrastructure/factories/make-cancel-chemical-cargo-use-case'
import { changeChemicalCargoStatusBodySchema } from '@/interfaces/dtos/change-chemical-cargo-status.dto'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function cancel(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().trim().min(1, { message: 'Id is required' }),
  })

  const { id } = paramsSchema.parse(request.params)
  const { reason } = changeChemicalCargoStatusBodySchema.parse(request.body)

  const cancelChemicalCargoUseCase = makeCancelChemicalCargoUseCase()

  const chemicalCargo = await cancelChemicalCargoUseCase.handler(id, reason)

  return reply.status(200).send(chemicalCargo)
}
