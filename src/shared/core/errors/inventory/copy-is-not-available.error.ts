import { DomainError } from '../domain.error';

export class CopyIsNotAvailableError extends DomainError {
  constructor() {
    super('The copy is not available for borrowing.');
    this.name = 'CopyIsNotAvailableError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CopyIsNotAvailableError);
    }
  }
}
