import { DomainError } from '../domain.error';

export class LoanRenewalLimitReachedError extends DomainError {
  constructor() {
    super('Loan renewal limit has been reached.');

    this.name = 'LoanRenewalLimitReachedError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoanRenewalLimitReachedError);
    }
  }
}
