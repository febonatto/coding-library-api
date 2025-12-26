import { DomainError } from '../domain.error';

export class CopyIsAlreadyAvailableError extends DomainError {
  constructor() {
    super('The copy is already available for borrowing.');
    this.name = 'CopyIsAlreadyAvailableError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CopyIsAlreadyAvailableError);
    }
  }
}
