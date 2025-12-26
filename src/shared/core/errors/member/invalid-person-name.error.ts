import { DomainError } from '../domain.error';

export class InvalidPersonNameError extends DomainError {
  constructor() {
    super('The person name should contain at least name and last surname.');
    this.name = 'InvalidPersonNameError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPersonNameError);
    }
  }
}
