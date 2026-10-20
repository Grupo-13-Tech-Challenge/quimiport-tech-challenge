import { block } from './block'
import { cancel } from './cancel'
import type { FastifyInstance } from 'fastify'

export async function chemicalCargo(app: FastifyInstance) {
  app.patch('/chemical-cargo/:id/block', block)
  app.patch('/chemical-cargo/:id/cancel', cancel)
}
