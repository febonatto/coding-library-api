import { Entity } from 'src/shared/core/abstract/entity';
import { Barcode } from '../value-object/barcode';
import { Book } from 'src/book/core/entity/book';
import { CopyStatus } from 'src/inventory/core/types/copy-status';
import { CopyIsNotAvailableError } from 'src/shared/core/errors/inventory/copy-is-not-available.error';
import { CopyIsAlreadyAvailableError } from 'src/shared/core/errors/inventory/copy-is-already-available.error';

interface InventoryConstructorProps {
  book: Book;
  barcode: Barcode;
  acquiredAt: Date;
  status: CopyStatus;
}

export class Inventory extends Entity<InventoryConstructorProps> {
  constructor(props: InventoryConstructorProps) {
    super(props);
  }

  get barcode(): Barcode {
    return this.props.barcode;
  }
  get acquiredAt(): Date {
    return this.props.acquiredAt;
  }
  get status(): CopyStatus {
    return this.props.status;
  }

  public checkout(): void {
    if (this.status !== CopyStatus.AVAILABLE) {
      throw new CopyIsNotAvailableError();
    }
    this.props.status = CopyStatus.BORROWED;
  }
  public checkin(): void {
    if (this.status === CopyStatus.AVAILABLE) {
      throw new CopyIsAlreadyAvailableError();
    }
    this.props.status = CopyStatus.AVAILABLE;
  }
}
