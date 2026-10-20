import { env } from '@/env'
import { ZodError } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'

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
}

export const globalErrorHandler = (
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  if (env.NODE_ENV === 'development') {
    console.error(error)
  }

  const handler = errorHandlerMap[error.constructor.name]

  if (handler) return handler(error, _, reply)

  return reply.status(500).send({ message: 'Internal Server Error' })
}
