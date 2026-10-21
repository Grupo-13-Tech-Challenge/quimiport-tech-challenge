import {
  blockedChemicalCargoResponseSchema,
  canceledChemicalCargoResponseSchema,
  chemicalCargoListResponseSchema,
  chemicalCargoResponseSchema,
  internalErrorResponseSchema,
  invalidStatusTransitionResponseSchema,
  notFoundErrorResponseSchema,
  reasonValidationErrorResponseSchema,
} from '@/interfaces/dtos/api-response.dto'
import { changeChemicalCargoStatusBodySchema } from '@/interfaces/dtos/change-chemical-cargo-status.dto'
import {
  idParamSchema,
  paginationQuerySchema,
} from '@/interfaces/dtos/http.dto'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { FastifyInstance } from 'fastify'
import { block } from './block'
import { cancel } from './cancel'
import { findAllChemicalCargo } from './find-all-chemical-cargo'
import { findChemicalCargo } from './find-chemical-cargo'

export async function chemicalCargo(app: FastifyInstance) {
  const routes = app.withTypeProvider<ZodTypeProvider>()

  routes.get(
    '/chemical-cargo',
    {
      schema: {
        tags: ['chemical-cargo'],
        summary: 'List chemical cargos',
        description:
          'Returns a page of chemical cargos and the associated product. page defaults to 1 and limit defaults to 10.',
        querystring: paginationQuerySchema,
        response: {
          200: chemicalCargoListResponseSchema,
          500: internalErrorResponseSchema,
        },
      },
    },
    findAllChemicalCargo,
  )

  routes.get(
    '/chemical-cargo/:id',
    {
      schema: {
        tags: ['chemical-cargo'],
        summary: 'Find a chemical cargo by id',
        description:
          'Returns the cargo and its product. An unknown or invalid id responds with 404.',
        params: idParamSchema,
        response: {
          200: chemicalCargoResponseSchema,
          404: notFoundErrorResponseSchema,
          500: internalErrorResponseSchema,
        },
      },
    },
    findChemicalCargo,
  )

  routes.patch(
    '/chemical-cargo/:id/block',
    {
      schema: {
        tags: ['chemical-cargo'],
        summary: 'Block a chemical cargo',
        description:
          'Blocks a cargo that is UNDER_INSPECTION. A reason is required. Any other current status responds with 409. An unknown or invalid id responds with 404.',
        params: idParamSchema,
        body: changeChemicalCargoStatusBodySchema,
        response: {
          200: blockedChemicalCargoResponseSchema,
          400: reasonValidationErrorResponseSchema,
          404: notFoundErrorResponseSchema,
          409: invalidStatusTransitionResponseSchema,
          500: internalErrorResponseSchema,
        },
      },
    },
    block,
  )

  routes.patch(
    '/chemical-cargo/:id/cancel',
    {
      schema: {
        tags: ['chemical-cargo'],
        summary: 'Cancel a chemical cargo',
        description:
          'Cancels a cargo from REGISTERED, UNDER_ANALYSIS, UNDER_INSPECTION, RELEASED, or BLOCKED. A reason is required. Completed, in transit, or already canceled cargos respond with 409. An unknown or invalid id responds with 404.',
        params: idParamSchema,
        body: changeChemicalCargoStatusBodySchema,
        response: {
          200: canceledChemicalCargoResponseSchema,
          400: reasonValidationErrorResponseSchema,
          404: notFoundErrorResponseSchema,
          409: invalidStatusTransitionResponseSchema,
          500: internalErrorResponseSchema,
        },
      },
    },
    cancel,
  )
}
