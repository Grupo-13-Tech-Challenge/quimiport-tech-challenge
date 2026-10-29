import { describe, expect, it } from 'vitest'
import { InvalidStatusTransitionError } from '@/domain/errors/invalid-status-transition-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import {
  assertCanBlock,
  assertCanCancel,
  assertCanChangeStatus,
} from '@/domain/services/cargo-status-transition'

describe('cargo-status-transition', () => {
  describe('assertCanBlock', () => {
    it('allows transition from UNDER_INSPECTION to BLOCKED', () => {
      expect(() => assertCanBlock(CargoStatus.UNDER_INSPECTION)).not.toThrow()
    })

    it.each([
      CargoStatus.REGISTERED,
      CargoStatus.UNDER_ANALYSIS,
      CargoStatus.RELEASED,
      CargoStatus.BLOCKED,
      CargoStatus.IN_TRANSIT,
      CargoStatus.COMPLETED,
      CargoStatus.CANCELED,
    ])('rejects block from %s', (status) => {
      expect(() => assertCanBlock(status)).toThrow(InvalidStatusTransitionError)
    })
  })

  describe('assertCanCancel', () => {
    it.each([
      CargoStatus.REGISTERED,
      CargoStatus.UNDER_ANALYSIS,
      CargoStatus.UNDER_INSPECTION,
      CargoStatus.RELEASED,
      CargoStatus.BLOCKED,
    ])('allows cancel from %s', (status) => {
      expect(() => assertCanCancel(status)).not.toThrow()
    })

    it.each([
      CargoStatus.IN_TRANSIT,
      CargoStatus.COMPLETED,
      CargoStatus.CANCELED,
    ])('rejects cancel from %s', (status) => {
      expect(() => assertCanCancel(status)).toThrow(
        InvalidStatusTransitionError,
      )
    })
  })

  describe('assertCanChangeStatus', () => {
    it.each([
      [CargoStatus.REGISTERED, CargoStatus.UNDER_ANALYSIS],
      [CargoStatus.REGISTERED, CargoStatus.CANCELED],
      [CargoStatus.UNDER_ANALYSIS, CargoStatus.UNDER_INSPECTION],
      [CargoStatus.UNDER_ANALYSIS, CargoStatus.CANCELED],
      [CargoStatus.UNDER_INSPECTION, CargoStatus.RELEASED],
      [CargoStatus.UNDER_INSPECTION, CargoStatus.BLOCKED],
      [CargoStatus.UNDER_INSPECTION, CargoStatus.CANCELED],
      [CargoStatus.RELEASED, CargoStatus.IN_TRANSIT],
      [CargoStatus.RELEASED, CargoStatus.CANCELED],
      [CargoStatus.BLOCKED, CargoStatus.CANCELED],
      [CargoStatus.IN_TRANSIT, CargoStatus.COMPLETED],
    ])('allows %s to %s', (current, target) => {
      expect(() => assertCanChangeStatus(current, target)).not.toThrow()
    })

    it.each([
      [CargoStatus.REGISTERED, CargoStatus.UNDER_INSPECTION],
      [CargoStatus.REGISTERED, CargoStatus.COMPLETED],
      [CargoStatus.REGISTERED, CargoStatus.BLOCKED],
      [CargoStatus.UNDER_INSPECTION, CargoStatus.COMPLETED],
      [CargoStatus.BLOCKED, CargoStatus.IN_TRANSIT],
      [CargoStatus.CANCELED, CargoStatus.RELEASED],
      [CargoStatus.COMPLETED, CargoStatus.IN_TRANSIT],
      [CargoStatus.RELEASED, CargoStatus.REGISTERED],
      [CargoStatus.IN_TRANSIT, CargoStatus.CANCELED],
    ])('rejects %s to %s', (current, target) => {
      expect(() => assertCanChangeStatus(current, target)).toThrow(
        InvalidStatusTransitionError,
      )
    })
  })
})
