export class InactiveProductError extends Error {
  constructor() {
    super('Inactive chemical product cannot be used in a new cargo')
  }
}
