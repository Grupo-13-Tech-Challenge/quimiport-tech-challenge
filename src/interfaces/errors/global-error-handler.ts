import { env } from '@/env'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { ZodError } from 'zod'

interface ErrorHandlerMap {
  [key: string]: (
    error: Error | ZodError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) => void
}

export const errorHandlerMap: ErrorHandlerMap = {
  ZodError: (error, _, reply) => {
    return reply.status(400).send({
      message: 'Validation Error',
      ...(error instanceof ZodError && { error: error.format() }),
    })
  },
  ResourceNotFoundError: (error, __, reply) => {
    return reply.status(404).send({ message: error.message })
  },
  InvalidStatusTransitionError: (error, __, reply) => {
    return reply.status(409).send({ message: error.message })
  },
  MissingRequiredDocumentationError: (error, __, reply) => {
    return reply.status(409).send({ message: error.message })
  },
  InactiveProductError: (error, __, reply) => {
    return reply.status(409).send({ message: error.message })
  },
}

export const globalErrorHandler = (
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  if (env.NODE_ENV === 'development') {
    console.error(error)
  }

  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation Error',
      error: error.validation,
    })
  }

  const handler = errorHandlerMap[error.constructor.name]

  if (handler) return handler(error, _, reply)

  return reply.status(500).send({ message: 'Internal Server Error' })
}
