import {
  chemicalProductListResponseSchema,
  chemicalProductResponseSchema,
  inactiveChemicalProductResponseSchema,
  internalErrorResponseSchema,
  notFoundErrorResponseSchema,
  productValidationErrorResponseSchema,
} from '@/interfaces/dtos/api-response.dto'
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
          'Creates a product with status ACTIVE. A product cannot be created without a name or without a risk class.',
        body: createChemicalProductBodySchema,
        response: {
          201: chemicalProductResponseSchema,
          400: productValidationErrorResponseSchema,
          500: internalErrorResponseSchema,
        },
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
        description:
          'Returns a page of chemical products. page defaults to 1 and limit defaults to 10.',
        querystring: paginationQuerySchema,
        response: {
          200: chemicalProductListResponseSchema,
          500: internalErrorResponseSchema,
        },
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
        description:
          'Returns the product when the id exists. An unknown or invalid id responds with 404.',
        params: idParamSchema,
        response: {
          200: chemicalProductResponseSchema,
          404: notFoundErrorResponseSchema,
          500: internalErrorResponseSchema,
        },
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
        description:
          'Replaces the product data. Name and risk class are required. The current status is preserved. An unknown or invalid id responds with 404.',
        params: idParamSchema,
        body: updateChemicalProductBodySchema,
        response: {
          200: chemicalProductResponseSchema,
          400: productValidationErrorResponseSchema,
          404: notFoundErrorResponseSchema,
          500: internalErrorResponseSchema,
        },
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
        description:
          'Sets the product status to INACTIVE. An unknown or invalid id responds with 404.',
        params: idParamSchema,
        response: {
          200: inactiveChemicalProductResponseSchema,
          404: notFoundErrorResponseSchema,
          500: internalErrorResponseSchema,
        },
      },
    },
    deactivate,
  )
}
