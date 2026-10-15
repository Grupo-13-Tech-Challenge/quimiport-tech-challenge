import { findChemicalProduct } from './find-chemical-product'
import { create } from './create'
import type { FastifyInstance } from 'fastify'

export async function chemicalProduct(app: FastifyInstance) {
  app.post('/chemical-product', create)
  app.get('/chemical-product/:id', findChemicalProduct)
}
