import { MemberType } from 'src/member/core/types/member.type';
import { DomainError } from '../domain.error';

export class MaxActiveLoansError extends DomainError {
  constructor(type: MemberType, maxLoans: number) {
    super(
      `Member of type ${type} cannot have more than ${maxLoans} active loans`,
    );
    this.name = 'MaxActiveLoansError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MaxActiveLoansError);
    }
  }
}
