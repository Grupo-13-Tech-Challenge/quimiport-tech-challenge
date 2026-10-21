import { chemicalCargo } from '@/interfaces/controllers/chemical-cargo/routes'
import { chemicalProduct } from '@/interfaces/controllers/chemical-product/routes'
import { globalErrorHandler } from '@/interfaces/errors/global-error-handler'
import fastify from 'fastify'
import fastifyMetrics from 'fastify-metrics'

export const app = fastify({
  logger: true,
})

app.register(fastifyMetrics, { endpoint: '/metrics' })
app.register(chemicalProduct)
app.register(chemicalCargo)

app.setErrorHandler(globalErrorHandler)
