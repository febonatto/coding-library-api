import { MemberFactory } from 'src/member/infra/factory/member.factory';
import { MemberType } from '../types/member.type';
import { MaxActiveLoansError } from 'src/shared/core/errors/member/max-active-loans.error';

describe('Member Entity', () => {
  it('should generate an id upon creation', () => {
    const member = MemberFactory.make();
    expect(member.id).toBeDefined();
  });
  it('should not be able to set more than 10 active loans for professors', () => {
    expect(() =>
      MemberFactory.make({ type: MemberType.PROFESSOR, activeLoans: 11 }),
    ).toThrow(MaxActiveLoansError);
  });
  it('should not be able to set more than 3 active loans for students', () => {
    expect(() =>
      MemberFactory.make({ type: MemberType.STUDENT, activeLoans: 4 }),
    ).toThrow(MaxActiveLoansError);
  });
  it('should not be able to set more than 1 active loan for general publics', () => {
    expect(() =>
      MemberFactory.make({ type: MemberType.GENERAL_PUBLIC, activeLoans: 2 }),
    ).toThrow(MaxActiveLoansError);
  });
});
