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
        querystring: paginationQuerySchema,
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
        params: idParamSchema,
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
        params: idParamSchema,
        body: changeChemicalCargoStatusBodySchema,
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
        params: idParamSchema,
        body: changeChemicalCargoStatusBodySchema,
      },
    },
    cancel,
  )
}
