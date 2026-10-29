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

const STATUS_TRANSITIONS: Record<CargoStatus, readonly CargoStatus[]> = {
  [CargoStatus.REGISTERED]: [CargoStatus.UNDER_ANALYSIS, CargoStatus.CANCELED],
  [CargoStatus.UNDER_ANALYSIS]: [
    CargoStatus.UNDER_INSPECTION,
    CargoStatus.CANCELED,
  ],
  [CargoStatus.UNDER_INSPECTION]: [
    CargoStatus.RELEASED,
    CargoStatus.BLOCKED,
    CargoStatus.CANCELED,
  ],
  [CargoStatus.RELEASED]: [CargoStatus.IN_TRANSIT, CargoStatus.CANCELED],
  [CargoStatus.BLOCKED]: [CargoStatus.CANCELED],
  [CargoStatus.IN_TRANSIT]: [CargoStatus.COMPLETED],
  [CargoStatus.COMPLETED]: [],
  [CargoStatus.CANCELED]: [],
}

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

export function assertCanChangeStatus(
  currentStatus: CargoStatus | undefined,
  targetStatus: CargoStatus,
): void {
  const allowed = currentStatus ? STATUS_TRANSITIONS[currentStatus] : []

  if (!currentStatus || !allowed.includes(targetStatus)) {
    throw new InvalidStatusTransitionError(
      currentStatus ?? CargoStatus.REGISTERED,
      targetStatus,
    )
  }
}
