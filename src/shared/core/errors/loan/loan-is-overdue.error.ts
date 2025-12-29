import { DomainError } from '../domain.error';

export class LoanIsOverdueError extends DomainError {
  constructor() {
    super('The loan is overdue.');

    this.name = 'LoanIsOverdueError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoanIsOverdueError);
    }
  }
}
