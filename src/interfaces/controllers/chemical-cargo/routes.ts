import {
  blockedChemicalCargoResponseSchema,
  canceledChemicalCargoResponseSchema,
  cargoValidationErrorResponseSchema,
  chemicalCargoListResponseSchema,
  chemicalCargoResponseSchema,
  inactiveProductResponseSchema,
  internalErrorResponseSchema,
  invalidStatusTransitionResponseSchema,
  missingDocumentationResponseSchema,
  notFoundErrorResponseSchema,
  reasonValidationErrorResponseSchema,
  releasedChemicalCargoResponseSchema,
  statusValidationErrorResponseSchema,
} from '@/interfaces/dtos/api-response.dto'
import { changeChemicalCargoStatusBodySchema } from '@/interfaces/dtos/change-chemical-cargo-status.dto'
import { createChemicalCargoBodySchema } from '@/interfaces/dtos/create-chemical-cargo.dto'
import { updateChemicalCargoStatusBodySchema } from '@/interfaces/dtos/update-chemical-cargo-status.dto'
import {
  idParamSchema,
  paginationQuerySchema,
} from '@/interfaces/dtos/http.dto'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { FastifyInstance } from 'fastify'
import { block } from './block'
import { cancel } from './cancel'
import { createChemicalCargo } from './create-chemical-cargo'
import { findAllChemicalCargo } from './find-all-chemical-cargo'
import { findChemicalCargo } from './find-chemical-cargo'
import { release } from './release'
import { updateStatus } from './update-status'

export async function chemicalCargo(app: FastifyInstance) {
  const routes = app.withTypeProvider<ZodTypeProvider>()

  routes.post(
    '/chemical-cargo',
    {
      schema: {
        tags: ['chemical-cargo'],
        summary: 'Register a chemical cargo',
        description:
          'Registers a cargo with status REGISTERED. The chemical product must exist and be ACTIVE. Quantity must be greater than zero and a technical responsible is required. An unknown product id responds with 404. An inactive product responds with 409.',
        body: createChemicalCargoBodySchema,
        response: {
          201: chemicalCargoResponseSchema,
          400: cargoValidationErrorResponseSchema,
          404: notFoundErrorResponseSchema,
          409: inactiveProductResponseSchema,
          500: internalErrorResponseSchema,
        },
      },
    },
    createChemicalCargo,
  )

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
    '/chemical-cargo/:id/status',
    {
      schema: {
        tags: ['chemical-cargo'],
        summary: 'Update a chemical cargo status',
        description:
          'Moves a cargo only through the allowed state machine. REGISTERED can go to UNDER_ANALYSIS or CANCELED. UNDER_ANALYSIS can go to UNDER_INSPECTION or CANCELED. UNDER_INSPECTION can go to RELEASED, BLOCKED, or CANCELED. RELEASED can go to IN_TRANSIT or CANCELED. IN_TRANSIT can go to COMPLETED. BLOCKED can go to CANCELED. COMPLETED and CANCELED are terminal. Any other transition responds with 409. An unknown or invalid id responds with 404.',
        params: idParamSchema,
        body: updateChemicalCargoStatusBodySchema,
        response: {
          200: chemicalCargoResponseSchema,
          400: statusValidationErrorResponseSchema,
          404: notFoundErrorResponseSchema,
          409: invalidStatusTransitionResponseSchema,
          500: internalErrorResponseSchema,
        },
      },
    },
    updateStatus,
  )

  routes.patch(
    '/chemical-cargo/:id/release',
    {
      schema: {
        tags: ['chemical-cargo'],
        summary: 'Release a chemical cargo',
        description:
          'Releases a cargo that is UNDER_INSPECTION and has valid required documentation. Any other status responds with 409. A cargo without valid documentation responds with 409. An unknown or invalid id responds with 404.',
        params: idParamSchema,
        response: {
          200: releasedChemicalCargoResponseSchema,
          404: notFoundErrorResponseSchema,
          409: missingDocumentationResponseSchema,
          500: internalErrorResponseSchema,
        },
      },
    },
    release,
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
