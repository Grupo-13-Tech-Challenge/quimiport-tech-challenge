import { CargoStatus } from '@/domain/enums/cargo-status.enum'
import { ProductStatus } from '@/domain/enums/product-status.enum'
import { z } from 'zod'

const responseDate = z.union([z.iso.datetime(), z.date()]).nullish()
const nullableString = z.string().nullish()

const productExample = {
  id: '5b48ce34-3cce-47ca-8892-51582632555c',
  name: 'Metanol',
  description:
    'Álcool tóxico e inflamável utilizado como solvente e matéria-prima na produção de formaldeído e combustíveis.',
  chemicalFormula: 'CH3OH',
  onuNumber: '1230',
  riskClass: '3',
  compatibilityGroup: 'Álcoois inflamáveis',
  productStatus: ProductStatus.ACTIVE,
  createdAt: '2026-10-21T15:44:44.000Z',
  updatedAt: '2026-10-21T15:44:44.000Z',
}

const inactiveProductExample = {
  ...productExample,
  productStatus: ProductStatus.INACTIVE,
  updatedAt: '2026-10-21T16:10:00.000Z',
}

export const chemicalProductResponseSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: nullableString,
    chemicalFormula: nullableString,
    onuNumber: nullableString,
    riskClass: z.string(),
    compatibilityGroup: nullableString,
    productStatus: z.enum(ProductStatus).nullish(),
    createdAt: responseDate,
    updatedAt: responseDate,
  })
  .meta({
    examples: [productExample],
  })

export const inactiveChemicalProductResponseSchema =
  chemicalProductResponseSchema.meta({
    examples: [inactiveProductExample],
  })

const cargoExample = {
  id: 'c1000000-0000-4000-8000-000000000001',
  cargoCode: 'CARGA-001',
  productId: productExample.id,
  quantity: 1500.5,
  unitOfMeasure: 'kg',
  cargoType: 'Granel liquido',
  origin: 'Porto de Santos',
  destination: 'Cubatao - SP',
  technicalResponsibleId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  cargoStatus: CargoStatus.REGISTERED,
  entryDate: '2026-10-18T08:30:00.000Z',
  createdAt: '2026-10-18T08:30:00.000Z',
  updatedAt: '2026-10-18T08:30:00.000Z',
  product: productExample,
}

export const chemicalCargoResponseSchema = z
  .object({
    id: z.uuid(),
    cargoCode: z.string(),
    productId: z.uuid(),
    quantity: z.number(),
    unitOfMeasure: z.string(),
    cargoType: nullableString,
    origin: z.string(),
    destination: z.string(),
    technicalResponsibleId: z.uuid(),
    cargoStatus: z.enum(CargoStatus).nullish(),
    entryDate: responseDate,
    createdAt: responseDate,
    updatedAt: responseDate,
    product: chemicalProductResponseSchema.nullish(),
  })
  .meta({
    examples: [cargoExample],
  })

export const releasedChemicalCargoResponseSchema =
  chemicalCargoResponseSchema.meta({
    examples: [
      {
        ...cargoExample,
        cargoStatus: CargoStatus.RELEASED,
        updatedAt: '2026-10-21T16:40:00.000Z',
      },
    ],
  })

export const blockedChemicalCargoResponseSchema =
  chemicalCargoResponseSchema.meta({
    examples: [
      {
        ...cargoExample,
        cargoStatus: CargoStatus.BLOCKED,
        updatedAt: '2026-10-21T16:20:00.000Z',
      },
    ],
  })

export const canceledChemicalCargoResponseSchema =
  chemicalCargoResponseSchema.meta({
    examples: [
      {
        ...cargoExample,
        cargoStatus: CargoStatus.CANCELED,
        updatedAt: '2026-10-21T16:30:00.000Z',
      },
    ],
  })

const messageResponse = (message: string) =>
  z
    .object({
      message: z.string(),
      error: z.unknown().optional(),
    })
    .meta({
      examples: [{ message }],
    })

export const cargoValidationErrorResponseSchema = z
  .object({
    message: z.string(),
    error: z.unknown().optional(),
  })
  .meta({
    examples: [
      {
        message: 'Validation Error',
        error: [
          { message: 'Quantity must be greater than zero', path: ['quantity'] },
          {
            message: 'Technical responsible id is required',
            path: ['technicalResponsibleId'],
          },
        ],
      },
    ],
  })

export const inactiveProductResponseSchema = messageResponse(
  'Inactive chemical product cannot be used in a new cargo',
)

export const productValidationErrorResponseSchema = z
  .object({
    message: z.string(),
    error: z.unknown().optional(),
  })
  .meta({
    examples: [
      {
        message: 'Validation Error',
        error: [
          { message: 'Name is required', path: ['name'] },
          { message: 'Risk class is required', path: ['riskClass'] },
        ],
      },
    ],
  })

export const statusValidationErrorResponseSchema = z
  .object({
    message: z.string(),
    error: z.unknown().optional(),
  })
  .meta({
    examples: [
      {
        message: 'Validation Error',
        error: [{ message: 'Status is required', path: ['status'] }],
      },
    ],
  })

export const reasonValidationErrorResponseSchema = z
  .object({
    message: z.string(),
    error: z.unknown().optional(),
  })
  .meta({
    examples: [
      {
        message: 'Validation Error',
        error: [{ message: 'Reason is required', path: ['reason'] }],
      },
    ],
  })

export const notFoundErrorResponseSchema = messageResponse('Resource not found')

export const missingDocumentationResponseSchema = messageResponse(
  'Cargo cannot be released without valid required documentation',
)

export const invalidStatusTransitionResponseSchema = messageResponse(
  'Invalid status transition from REGISTERED to BLOCKED',
)

export const cargoStatusConflictResponseSchema = z
  .object({
    message: z.string(),
  })
  .meta({
    examples: [
      {
        message: 'Invalid status transition from REGISTERED to BLOCKED',
      },
      {
        message:
          'Cargo cannot be released without valid required documentation',
      },
    ],
  })

export const internalErrorResponseSchema = messageResponse(
  'Internal Server Error',
)

export const chemicalProductListResponseSchema = z
  .array(chemicalProductResponseSchema)
  .meta({
    examples: [[productExample]],
  })

export const chemicalCargoListResponseSchema = z
  .array(chemicalCargoResponseSchema)
  .meta({
    examples: [[cargoExample]],
  })
