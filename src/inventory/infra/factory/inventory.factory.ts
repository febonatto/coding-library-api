import { faker } from '@faker-js/faker';
import { BookFactory } from 'src/book/infra/factory/book.factory';
import { Inventory } from 'src/inventory/core/entity/inventory';
import { Barcode } from 'src/inventory/core/value-object/barcode';
import { CopyStatus } from 'src/inventory/core/types/copy-status';

export class InventoryFactory {
  static make(overrides?: Partial<Inventory>): Inventory {
    const acquiredAt =
      overrides?.acquiredAt ??
      faker.date.between({
        from: new Date('2000-01-01T00:00:00Z'),
        to: new Date(),
      });
    return new Inventory({
      book: BookFactory.make(),
      barcode: new Barcode({
        acquisitionYear: acquiredAt.getUTCFullYear(),
        sequence: faker.number.int({ max: 999999 }),
      }),
      acquiredAt,
      status: CopyStatus.AVAILABLE,
      ...overrides,
    });
  }
}
