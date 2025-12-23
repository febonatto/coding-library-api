import { DomainError } from './domain.error';

export class NotEmptyError extends DomainError {
  constructor(fieldName: string) {
    super(`Field '${fieldName}' should not be empty.`);
    this.name = 'NotEmptyError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotEmptyError);
    }
  }
}
