import { createChemicalProductBodySchema } from '@/interfaces/dtos/create-chemical-product.dto'
import {
  idParamSchema,
  paginationQuerySchema,
} from '@/interfaces/dtos/http.dto'
import { updateChemicalProductBodySchema } from '@/interfaces/dtos/update-chemical-product.dto'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { deactivate } from './deactivate'
import { findAllChemicalProduct } from './find-all-chemical-product'
import { findChemicalProduct } from './find-chemical-product'
import { update } from './update'

export async function chemicalProduct(app: FastifyInstance) {
  const routes = app.withTypeProvider<ZodTypeProvider>()

  routes.post(
    '/chemical-product',
    {
      schema: {
        tags: ['chemical-product'],
        summary: 'Create a chemical product',
        description:
          'The product is created with status ACTIVE. Name and risk class are required.',
        body: createChemicalProductBodySchema,
      },
    },
    create,
  )

  routes.get(
    '/chemical-product',
    {
      schema: {
        tags: ['chemical-product'],
        summary: 'List chemical products',
        querystring: paginationQuerySchema,
      },
    },
    findAllChemicalProduct,
  )

  routes.get(
    '/chemical-product/:id',
    {
      schema: {
        tags: ['chemical-product'],
        summary: 'Find a chemical product by id',
        params: idParamSchema,
      },
    },
    findChemicalProduct,
  )

  routes.put(
    '/chemical-product/:id',
    {
      schema: {
        tags: ['chemical-product'],
        summary: 'Update a chemical product',
        params: idParamSchema,
        body: updateChemicalProductBodySchema,
      },
    },
    update,
  )

  routes.patch(
    '/chemical-product/:id/inactivate',
    {
      schema: {
        tags: ['chemical-product'],
        summary: 'Deactivate a chemical product',
        params: idParamSchema,
      },
    },
    deactivate,
  )
}
