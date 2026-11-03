import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { createJsonSchemaTransform } from 'fastify-type-provider-zod'
import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

export const swagger = fp(async function swagger(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'QuimiPort',
        description:
          'API for managing chemical products and cargo in a port operation.',
        version: '1.0.0',
      },
      tags: [
        {
          name: 'chemical-product',
          description:
            'Create, update, query, and deactivate chemical products',
        },
        {
          name: 'chemical-cargo',
          description:
            'Register, query, update status, release, block, and cancel chemical cargo',
        },
      ],
    },
    transform: createJsonSchemaTransform({
      skipList: ['/docs', '/docs/*', '/metrics'],
    }),
  })

  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })
})
