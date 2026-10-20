import { InvalidStatusTransitionError } from '@/domain/errors/invalid-status-transition-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'

const BLOCK_ALLOWED_FROM = new Set<CargoStatus>([CargoStatus.UNDER_INSPECTION])

const CANCEL_ALLOWED_FROM = new Set<CargoStatus>([
  CargoStatus.REGISTERED,
  CargoStatus.UNDER_ANALYSIS,
  CargoStatus.UNDER_INSPECTION,
  CargoStatus.RELEASED,
  CargoStatus.BLOCKED,
])

export function assertCanBlock(currentStatus?: CargoStatus): void {
  if (!currentStatus || !BLOCK_ALLOWED_FROM.has(currentStatus)) {
    throw new InvalidStatusTransitionError(
      currentStatus ?? CargoStatus.REGISTERED,
      CargoStatus.BLOCKED,
    )
  }
}

export function assertCanCancel(currentStatus?: CargoStatus): void {
  if (!currentStatus || !CANCEL_ALLOWED_FROM.has(currentStatus)) {
    throw new InvalidStatusTransitionError(
      currentStatus ?? CargoStatus.REGISTERED,
      CargoStatus.CANCELED,
    )
  }
}
