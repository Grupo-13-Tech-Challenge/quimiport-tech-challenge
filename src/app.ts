import { chemicalCargo } from '@/interfaces/controllers/chemical-cargo/routes'
import { chemicalProduct } from '@/interfaces/controllers/chemical-product/routes'
import { globalErrorHandler } from '@/interfaces/errors/global-error-handler'
import { swagger } from '@/interfaces/plugins/swagger'
import fastify from 'fastify'
import fastifyMetrics from 'fastify-metrics'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

export const app = fastify({
  logger: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(swagger)
app.register(fastifyMetrics, { endpoint: '/metrics' })
app.register(chemicalProduct)
app.register(chemicalCargo)

app.setErrorHandler(globalErrorHandler)
