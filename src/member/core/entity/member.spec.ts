import { MemberFactory } from 'src/member/infra/factory/member.factory';
import { MemberType } from '../types/member.type';
import { MaxActiveLoansError } from 'src/shared/core/errors/member/max-active-loans.error';
import { MemberTypePolicy } from '../constants/member-type-policy';

describe('Member Entity', () => {
  it('should generate an id upon creation', () => {
    const member = MemberFactory.make();
    expect(member.id).toBeDefined();
  });
  it('should not be able to set more than 10 active loans for professors', () => {
    const policies = MemberTypePolicy[MemberType.PROFESSOR];
    expect(() =>
      MemberFactory.make({
        type: MemberType.PROFESSOR,
        activeLoans: policies.maxLoans + 1,
      }),
    ).toThrow(MaxActiveLoansError);
  });
  it('should not be able to set more than 3 active loans for students', () => {
    const policies = MemberTypePolicy[MemberType.STUDENT];
    expect(() =>
      MemberFactory.make({
        type: MemberType.STUDENT,
        activeLoans: policies.maxLoans + 1,
      }),
    ).toThrow(MaxActiveLoansError);
  });
  it('should not be able to set more than 1 active loan for general publics', () => {
    const policies = MemberTypePolicy[MemberType.GENERAL_PUBLIC];
    expect(() =>
      MemberFactory.make({
        type: MemberType.GENERAL_PUBLIC,
        activeLoans: policies.maxLoans + 1,
      }),
    ).toThrow(MaxActiveLoansError);
  });
});
