import { makeCreateChemicalCargoUseCase } from '@/infrastructure/factories/make-create-chemical-cargo-use-case'
import { createChemicalCargoBodySchema } from '@/interfaces/dtos/create-chemical-cargo.dto'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function createChemicalCargo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createChemicalCargoBodySchema.parse(request.body)

  const createChemicalCargoUseCase = makeCreateChemicalCargoUseCase()
  const chemicalCargo = await createChemicalCargoUseCase.handler(body)

  request.log.info(
    {
      cargoId: chemicalCargo.id,
      cargoCode: chemicalCargo.cargoCode,
      productId: chemicalCargo.productId,
    },
    'Chemical cargo registered',
  )

  return reply.status(201).send(chemicalCargo)
}
