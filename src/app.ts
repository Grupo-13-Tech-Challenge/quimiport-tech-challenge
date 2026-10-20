import { chemicalProduct } from '@/interfaces/controllers/chemical-product/routes'
import { globalErrorHandler } from '@/interfaces/errors/global-error-handler'
import fastify from 'fastify'
export const app = fastify({
  logger: true,
})

app.register(chemicalProduct)

app.setErrorHandler(globalErrorHandler)
