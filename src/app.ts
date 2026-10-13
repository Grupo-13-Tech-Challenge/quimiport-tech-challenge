import { chemicalProduct } from '@/interfaces/controllers/chemical-product/routes'
import fastify from 'fastify'
export const app = fastify({
  logger: true,
})

app.register(chemicalProduct)
