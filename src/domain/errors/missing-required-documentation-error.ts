export class MissingRequiredDocumentationError extends Error {
  constructor() {
    super('Cargo cannot be released without valid required documentation')
  }
}
