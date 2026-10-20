import { findAllChemicalCargo } from './find-all-chemical-cargo'
import { findChemicalCargo } from './find-chemical-cargo'
import type { FastifyInstance } from 'fastify'

export async function chemicalCargo(app: FastifyInstance) {
  app.get('/chemical-cargo/:id', findChemicalCargo)
  app.get('/chemical-cargo', findAllChemicalCargo)
}
