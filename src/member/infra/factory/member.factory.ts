import { faker } from '@faker-js/faker';
import { Member } from 'src/member/core/entity/member';
import { MemberType } from 'src/member/core/types/member.type';
import { Email } from 'src/member/core/value-object/email';
import { PersonName } from 'src/member/core/value-object/person-name';

export class MemberFactory {
  static make(overrides?: Partial<Member>): Member {
    return new Member({
      name: new PersonName(faker.person.fullName()),
      email: new Email(faker.internet.email()),
      type: MemberType.GENERAL_PUBLIC,
      activeLoans: 0,
      ...overrides,
    });
  }
}
