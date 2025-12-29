import { DomainError } from '../domain.error';

export class CannotRenewLoanError extends DomainError {
  constructor() {
    super('Member type cannot renew loan.');

    this.name = 'CannotRenewLoanError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CannotRenewLoanError);
    }
  }
}
