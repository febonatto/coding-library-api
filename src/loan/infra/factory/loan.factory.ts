import { InventoryFactory } from 'src/inventory/infra/factory/inventory.factory';
import { Loan } from 'src/loan/core/entity/loan';
import { MemberFactory } from 'src/member/infra/factory/member.factory';

export class LoanFactory {
  static make(overrides?: Partial<Loan>): Loan {
    return new Loan({
      member: MemberFactory.make(),
      inventory: InventoryFactory.make(),
      ...overrides,
    });
  }
}
