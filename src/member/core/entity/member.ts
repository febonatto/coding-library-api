import { Entity } from 'src/shared/core/abstract/entity';
import { PersonName } from '../value-object/person-name';
import { Email } from '../value-object/email';
import { MemberType } from '../types/member.type';
import { MaxActiveLoansError } from 'src/shared/core/errors/member/max-active-loans.error';

interface MemberConstructorProps {
  name: PersonName;
  email: Email;
  type: MemberType;
  activeLoans: number;
}

export class Member extends Entity<MemberConstructorProps> {
  constructor(props: MemberConstructorProps) {
    super(props);

    this.activeLoans = props.activeLoans;
  }

  private set activeLoans(activeLoans: number) {
    this.validateActiveLoans(activeLoans);
    this.props.activeLoans = activeLoans;
  }

  get type(): MemberType {
    return this.props.type;
  }
  get activeLoans(): number {
    return this.props.activeLoans;
  }

  private validateActiveLoans(activeLoans: number): void {
    if (this.type === MemberType.STUDENT && activeLoans > 3) {
      throw new MaxActiveLoansError(this.type, 3);
    }
    if (this.type === MemberType.PROFESSOR && activeLoans > 10) {
      throw new MaxActiveLoansError(this.type, 10);
    }
    if (this.type === MemberType.GENERAL_PUBLIC && activeLoans > 1) {
      throw new MaxActiveLoansError(this.type, 1);
    }
  }
}
