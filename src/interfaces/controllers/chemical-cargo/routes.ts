import { block } from './block'
import { cancel } from './cancel'
import { createChemicalCargo } from './create-chemical-cargo'
import { findAllChemicalCargo } from './find-all-chemical-cargo'
import { findChemicalCargo } from './find-chemical-cargo'
import type { FastifyInstance } from 'fastify'

export async function chemicalCargo(app: FastifyInstance) {
  app.post('/chemical-cargo', createChemicalCargo)
  app.get('/chemical-cargo/:id', findChemicalCargo)
  app.get('/chemical-cargo', findAllChemicalCargo)
  app.patch('/chemical-cargo/:id/block', block)
  app.patch('/chemical-cargo/:id/cancel', cancel)
}