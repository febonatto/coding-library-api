import { Entity } from 'src/shared/core/abstract/entity';
import { PersonName } from '../value-object/person-name';
import { Email } from '../value-object/email';
import { MemberType } from '../types/member.type';
import { MaxActiveLoansError } from 'src/shared/core/errors/member/max-active-loans.error';
import { MemberTypePolicy } from '../constants/member-type-policy';

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
    const { maxLoans } = MemberTypePolicy[this.type];
    if (activeLoans > maxLoans) {
      throw new MaxActiveLoansError(this.type, maxLoans);
    }
  }
}
