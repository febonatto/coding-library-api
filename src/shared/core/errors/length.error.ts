import { DomainError } from './domain.error';

export class LengthError extends DomainError {
  constructor(field: string, length: string | number) {
    super(
      `Invalid length for field "${field}". Expected ${length} characters.`,
    );
    this.name = 'LengthError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LengthError);
    }
  }
}
