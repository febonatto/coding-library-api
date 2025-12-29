import { addDays } from 'date-fns';
import { CopyStatus } from 'src/inventory/core/types/copy-status';
import { LoanFactory } from 'src/loan/infra/factory/loan.factory';
import { MemberTypePolicy } from 'src/member/core/constants/member-type-policy';
import { MemberType } from 'src/member/core/types/member.type';
import { MemberFactory } from 'src/member/infra/factory/member.factory';
import { CannotRenewLoanError } from 'src/shared/core/errors/loan/cannot-renew-loan.error';
import { LoanIsOverdueError } from 'src/shared/core/errors/loan/loan-is-overdue.error';
import { LoanRenewalLimitReachedError } from 'src/shared/core/errors/loan/loan-renewal-limit-reached.error';
import { LoanStatus } from '../types/loan-status';

describe('Loan Entity', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should generate an id upon creation', () => {
    const loan = LoanFactory.make();
    expect(loan.id).toBeDefined();
  });
  it('should due date be defined according member type', () => {
    const fakeTime = new Date(2024, 0, 1);
    jest.setSystemTime(fakeTime);

    const { loanDays: studentLoanDays } = MemberTypePolicy[MemberType.STUDENT];
    const studentLoan = LoanFactory.make({
      member: MemberFactory.make({ type: MemberType.STUDENT }),
    });
    expect(studentLoan.dueDate).toStrictEqual(
      addDays(fakeTime, studentLoanDays),
    );

    const { loanDays: professorLoanDays } =
      MemberTypePolicy[MemberType.PROFESSOR];
    const professorLoan = LoanFactory.make({
      member: MemberFactory.make({ type: MemberType.PROFESSOR }),
    });
    expect(professorLoan.dueDate).toStrictEqual(
      addDays(fakeTime, professorLoanDays),
    );

    const { loanDays: generalPublicLoanDays } =
      MemberTypePolicy[MemberType.GENERAL_PUBLIC];
    const generalPublicLoan = LoanFactory.make({
      member: MemberFactory.make({ type: MemberType.GENERAL_PUBLIC }),
    });
    expect(generalPublicLoan.dueDate).toStrictEqual(
      addDays(fakeTime, generalPublicLoanDays),
    );
  });
  it('should renewal count be zero upon creation', () => {
    const loan = LoanFactory.make();
    expect(loan.renewalCount).toBe(0);
  });
  it('should be able to renewal loan changing renewal count and due date according to member type', () => {
    const fakeDueDate = new Date(2024, 0, 1);
    jest.setSystemTime(fakeDueDate);

    const loan = LoanFactory.make({
      member: MemberFactory.make({ type: MemberType.PROFESSOR }),
    });
    expect(loan.renewalCount).toBe(0);

    const fakeRenew = new Date(2024, 0, 22);
    jest.setSystemTime(fakeRenew);

    loan.renew();

    const { loanDays } = MemberTypePolicy[MemberType.PROFESSOR];
    expect(loan.renewalCount).toBe(1);
    expect(loan.dueDate).toStrictEqual(addDays(fakeRenew, loanDays));
  });
  it('should not be able to renew if member type equal to general public', () => {
    const loan = LoanFactory.make({
      member: MemberFactory.make({ type: MemberType.GENERAL_PUBLIC }),
    });
    expect(() => loan.renew()).toThrow(CannotRenewLoanError);
  });
  it('should not be able to renew if is loan overdue', () => {
    const fakeTime = new Date(2024, 0, 1);
    jest.setSystemTime(fakeTime);

    const { loanDays } = MemberTypePolicy[MemberType.STUDENT];
    const loan = LoanFactory.make({
      member: MemberFactory.make({ type: MemberType.STUDENT }),
    });

    const afterDueDateTime = addDays(fakeTime, loanDays + 1);
    jest.setSystemTime(afterDueDateTime);

    expect(() => loan.renew()).toThrow(LoanIsOverdueError);
  });
  it('should throw an error if loan renewal limit has reached', () => {
    const { maxLoans } = MemberTypePolicy[MemberType.STUDENT];
    const loan = LoanFactory.make({
      member: MemberFactory.make({ type: MemberType.STUDENT }),
    });
    for (let i = 0; i < maxLoans - 1; i++) {
      loan.renew();
    }

    expect(() => loan.renew()).toThrow(LoanRenewalLimitReachedError);
  });
  it('should, upon creation, mark loan status as ACTIVE and inventory copy as BORROWED', () => {
    const loan = LoanFactory.make();
    expect(loan.status).toBe(LoanStatus.ACTIVE);
    expect(loan.inventory.status).toBe(CopyStatus.BORROWED);
  });
  it('should mark return date, set loan status to CLOSED and update inventory status', () => {
    const startLoanDate = new Date(2024, 0, 1);
    jest.setSystemTime(startLoanDate);

    const loan = LoanFactory.make();

    const returnLoanDate = new Date(2024, 0, 5);
    jest.setSystemTime(returnLoanDate);

    loan.registerReturn();

    expect(loan.returnDate).toStrictEqual(returnLoanDate);
    expect(loan.status).toBe(LoanStatus.CLOSED);
    expect(loan.inventory.status).not.toBe(CopyStatus.BORROWED);
  });
  it('should mark loan status to OVERDUE when current date is after due date', () => {
    const fakeTime = new Date(2024, 0, 1);
    jest.setSystemTime(fakeTime);

    const { loanDays } = MemberTypePolicy[MemberType.STUDENT];
    const loan = LoanFactory.make({
      member: MemberFactory.make({ type: MemberType.STUDENT }),
    });

    const afterDueDateTime = addDays(fakeTime, loanDays + 1);
    jest.setSystemTime(afterDueDateTime);

    loan.registerReturn();
    expect(loan.status).toBe(LoanStatus.OVERDUE);
  });
});
