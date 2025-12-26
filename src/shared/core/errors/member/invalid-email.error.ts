import { DomainError } from '../domain.error';

export class InvalidEmailError extends DomainError {
  constructor() {
    super('The provided email is not valid.');
    this.name = 'InvalidEmailError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidEmailError);
    }
  }
}
