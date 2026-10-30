import { makeUpdateChemicalCargoStatusUseCase } from '@/infrastructure/factories/make-update-chemical-cargo-status-use-case'
import { updateChemicalCargoStatusBodySchema } from '@/interfaces/dtos/update-chemical-cargo-status.dto'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateStatus(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().trim().min(1, { message: 'Id is required' }),
  })

  const { id } = paramsSchema.parse(request.params)
  const { status } = updateChemicalCargoStatusBodySchema.parse(request.body)

  const updateChemicalCargoStatusUseCase =
    makeUpdateChemicalCargoStatusUseCase()

  const chemicalCargo = await updateChemicalCargoStatusUseCase.handler(
    id,
    status,
  )

  request.log.info(
    { cargoId: chemicalCargo.id, status: chemicalCargo.cargoStatus },
    'Chemical cargo status updated',
  )

  return reply.status(200).send(chemicalCargo)
}
