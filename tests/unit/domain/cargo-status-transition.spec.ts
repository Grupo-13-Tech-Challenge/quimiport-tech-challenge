import { describe, expect, it } from 'vitest'
import { InvalidStatusTransitionError } from '@/domain/errors/invalid-status-transition-error'
import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import {
  assertCanBlock,
  assertCanCancel,
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
      expect(() => assertCanCancel(status)).toThrow(InvalidStatusTransitionError)
    })
  })
})
