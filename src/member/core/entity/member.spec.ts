import { MemberFactory } from 'src/member/infra/factory/member.factory';
import { MemberType } from '../types/member.type';
import { MaxActiveLoansError } from 'src/shared/core/errors/member/max-active-loans.error';
import { MemberTypePolicy } from '../constants/member-type-policy';
import { LoanFactory } from 'src/loan/infra/factory/loan.factory';

describe('Member Entity', () => {
  it('should generate an id upon creation', () => {
    const member = MemberFactory.make();
    expect(member.id).toBeDefined();
  });
  it('should not be able to set more than 10 active loans for professors', () => {
    const { maxLoans } = MemberTypePolicy[MemberType.PROFESSOR];
    expect(() =>
      MemberFactory.make({
        type: MemberType.PROFESSOR,
        activeLoans: Array.from({ length: maxLoans + 1 }, () =>
          LoanFactory.make(),
        ),
      }),
    ).toThrow(MaxActiveLoansError);
  });
  it('should not be able to set more than 3 active loans for students', () => {
    const { maxLoans } = MemberTypePolicy[MemberType.STUDENT];
    expect(() =>
      MemberFactory.make({
        type: MemberType.STUDENT,
        activeLoans: Array.from({ length: maxLoans + 1 }, () =>
          LoanFactory.make(),
        ),
      }),
    ).toThrow(MaxActiveLoansError);
  });
  it('should not be able to set more than 1 active loan for general publics', () => {
    const { maxLoans } = MemberTypePolicy[MemberType.GENERAL_PUBLIC];
    expect(() =>
      MemberFactory.make({
        type: MemberType.GENERAL_PUBLIC,
        activeLoans: Array.from({ length: maxLoans + 1 }, () =>
          LoanFactory.make(),
        ),
      }),
    ).toThrow(MaxActiveLoansError);
  });
  it('should store only loans with status ACTIVE', () => {
    const activeLoan = LoanFactory.make();
    const closedLoan = LoanFactory.make();
    closedLoan.registerReturn();

    const member = MemberFactory.make({
      activeLoans: [activeLoan, closedLoan],
    });

    expect(member.activeLoans).toHaveLength(1);
    expect(member.activeLoans[0].id).toBe(activeLoan.id);
  });
});
