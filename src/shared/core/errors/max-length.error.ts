import { DomainError } from './domain.error';

export class MaxLengthError extends DomainError {
  constructor(field: string, length: number) {
    super(
      `The field "${field}" exceeds the maximum length of ${length} characters.`,
    );
    this.name = 'MaxLengthError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MaxLengthError);
    }
  }
}
