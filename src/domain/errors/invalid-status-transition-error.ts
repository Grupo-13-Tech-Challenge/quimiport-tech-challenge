import type { CargoStatus } from '@/domain/enums/cargo-status.enum'

export class InvalidStatusTransitionError extends Error {
  constructor(currentStatus: CargoStatus, targetStatus: CargoStatus) {
    super(`Invalid status transition from ${currentStatus} to ${targetStatus}`)
  }
}
