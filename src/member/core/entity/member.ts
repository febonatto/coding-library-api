import { Entity } from 'src/shared/core/abstract/entity';
import { PersonName } from '../../../shared/core/value-object/person-name';
import { Email } from '../value-object/email';
import { MemberType } from '../types/member.type';
import { MaxActiveLoansError } from 'src/shared/core/errors/member/max-active-loans.error';
import { MemberTypePolicy } from '../constants/member-type-policy';
import { Loan } from 'src/loan/core/entity/loan';
import { LoanStatus } from 'src/loan/core/types/loan-status';

interface MemberConstructorProps {
  name: PersonName;
  email: Email;
  type: MemberType;
  activeLoans: Loan[];
}

export class Member extends Entity<MemberConstructorProps> {
  constructor(props: MemberConstructorProps) {
    super(props);

    this.activeLoans = props.activeLoans;
  }

  private set activeLoans(activeLoans: Loan[]) {
    const filteredLoans = this.filterActiveLoans(activeLoans);
    this.validateActiveLoans(filteredLoans);
    this.props.activeLoans = filteredLoans;
  }

  get type(): MemberType {
    return this.props.type;
  }
  get activeLoans(): Loan[] {
    return this.props.activeLoans;
  }

  private filterActiveLoans(activeLoans: Loan[]): Loan[] {
    return activeLoans.filter((loan) => loan.status === LoanStatus.ACTIVE);
  }
  private validateActiveLoans(activeLoans: Loan[]): void {
    const { maxLoans } = MemberTypePolicy[this.type];
    if (activeLoans.length > maxLoans) {
      throw new MaxActiveLoansError(this.type, maxLoans);
    }
  }
}
