import { describe, expect, it } from 'vitest'
import { changeChemicalCargoStatusBodySchema } from '@/interfaces/dtos/change-chemical-cargo-status.dto'

describe('changeChemicalCargoStatusBodySchema', () => {
  it('accepts a valid reason', () => {
    const result = changeChemicalCargoStatusBodySchema.parse({
      reason: 'Risco ambiental',
    })

    expect(result.reason).toBe('Risco ambiental')
  })

  it('rejects missing reason', () => {
    expect(() => changeChemicalCargoStatusBodySchema.parse({})).toThrow()
  })

  it('rejects empty reason', () => {
    expect(() =>
      changeChemicalCargoStatusBodySchema.parse({ reason: '   ' }),
    ).toThrow()
  })
})
