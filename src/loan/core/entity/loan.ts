import { addDays, isAfter } from 'date-fns';
import { Inventory } from 'src/inventory/core/entity/inventory';
import { MemberTypePolicy } from 'src/member/core/constants/member-type-policy';
import { Member } from 'src/member/core/entity/member';
import { MemberType } from 'src/member/core/types/member.type';
import { Entity } from 'src/shared/core/abstract/entity';
import { CannotRenewLoanError } from 'src/shared/core/errors/loan/cannot-renew-loan.error';
import { LoanIsOverdueError } from 'src/shared/core/errors/loan/loan-is-overdue.error';
import { LoanRenewalLimitReachedError } from 'src/shared/core/errors/loan/loan-renewal-limit-reached.error';

interface LoanConstructorProps {
  member: Member;
  inventory: Inventory;
}

interface LoanProps extends LoanConstructorProps {
  dueDate: Date;
  returnDate: Date | null;
  renewalCount: number;
}

export class Loan extends Entity<LoanProps> {
  constructor(props: LoanConstructorProps) {
    super({
      ...props,
      dueDate: new Date(),
      returnDate: null,
      renewalCount: 0,
    });

    this.initializeLoan();
  }

  get member(): Member {
    return this.props.member;
  }
  get inventory(): Inventory {
    return this.props.inventory;
  }
  get dueDate(): Date {
    return this.props.dueDate;
  }
  get returnDate(): Date | null {
    return this.props.returnDate;
  }
  get renewalCount(): number {
    return this.props.renewalCount;
  }

  public renew(): void {
    if (this.member.type === MemberType.GENERAL_PUBLIC) {
      throw new CannotRenewLoanError();
    }
    if (isAfter(new Date(), this.dueDate)) {
      throw new LoanIsOverdueError();
    }

    const { maxRenewCount } = MemberTypePolicy[this.member.type];
    if (this.renewalCount === maxRenewCount) {
      throw new LoanRenewalLimitReachedError();
    }

    this.props.dueDate = this.dueDateByMemberType();
    this.props.renewalCount++;
  }

  public registerReturn(): void {
    this.props.returnDate = new Date();
    this.props.inventory.checkin();
  }

  private initializeLoan(): void {
    this.props.inventory.checkout();
    this.props.dueDate = this.dueDateByMemberType();
  }

  private dueDateByMemberType(): Date {
    const { loanDays } = MemberTypePolicy[this.member.type];

    return addDays(new Date(), loanDays);
  }
}
