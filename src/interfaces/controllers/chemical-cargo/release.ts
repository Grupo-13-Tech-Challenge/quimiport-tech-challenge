import { makeReleaseChemicalCargoUseCase } from '@/infrastructure/factories/make-release-chemical-cargo-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function release(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().trim().min(1, { message: 'Id is required' }),
  })

  const { id } = paramsSchema.parse(request.params)

  const releaseChemicalCargoUseCase = makeReleaseChemicalCargoUseCase()

  const chemicalCargo = await releaseChemicalCargoUseCase.handler(id)

  return reply.status(200).send(chemicalCargo)
}
