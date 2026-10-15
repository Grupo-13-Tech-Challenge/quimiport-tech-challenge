import { create } from './create'
import { findAllChemicalProduct } from './find-all-chemical-product'
import { findChemicalProduct } from './find-chemical-product'
import { update } from './update'
import type { FastifyInstance } from 'fastify'

export async function chemicalProduct(app: FastifyInstance) {
  app.post('/chemical-product', create)
  app.get('/chemical-product/:id', findChemicalProduct)
  app.get('/chemical-product', findAllChemicalProduct)
  app.put('/chemical-product/:id', update)
}
