import { makeBlockChemicalCargoUseCase } from '@/infrastructure/factories/make-block-chemical-cargo-use-case'
import { changeChemicalCargoStatusBodySchema } from '@/interfaces/dtos/change-chemical-cargo-status.dto'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function block(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().trim().min(1, { message: 'Id is required' }),
  })

  const { id } = paramsSchema.parse(request.params)
  const { reason } = changeChemicalCargoStatusBodySchema.parse(request.body)

  const blockChemicalCargoUseCase = makeBlockChemicalCargoUseCase()

  const chemicalCargo = await blockChemicalCargoUseCase.handler(id, reason)

  return reply.status(200).send(chemicalCargo)
}
