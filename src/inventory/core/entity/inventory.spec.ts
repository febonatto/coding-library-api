import { InventoryFactory } from 'src/inventory/infra/factory/inventory.factory';
import { CopyStatus } from 'src/inventory/core/types/copy-status';
import { CopyIsAlreadyAvailableError } from 'src/shared/core/errors/inventory/copy-is-already-available.error';
import { CopyIsNotAvailableError } from 'src/shared/core/errors/inventory/copy-is-not-available.error';

describe('Inventory Entity', () => {
  it('should generate an id upon creation', () => {
    const inventory = InventoryFactory.make();
    expect(inventory.id).toBeDefined();
  });
  it('should barcode has acquiredAt properly set', () => {
    const acquiredAt = new Date('2023-01-01');
    const inventory = InventoryFactory.make({ acquiredAt });
    const barcodeHasYear = inventory.barcode.value.includes('2023');
    expect(barcodeHasYear).toBe(true);
    expect(inventory.acquiredAt).toBe(acquiredAt);
  });
  it('should mark as borrowed when checkout is called', () => {
    const inventory = InventoryFactory.make({ status: CopyStatus.AVAILABLE });
    inventory.checkout();
    expect(inventory.status).toBe(CopyStatus.BORROWED);
  });
  it('should not be able to make checkout if status is not AVAILABLE', () => {
    const inventory = InventoryFactory.make({ status: CopyStatus.BORROWED });
    expect(() => inventory.checkout()).toThrow(CopyIsNotAvailableError);
  });
  it('should mark as available when checkin is called', () => {
    const inventory = InventoryFactory.make({ status: CopyStatus.BORROWED });
    inventory.checkin();
    expect(inventory.status).toBe(CopyStatus.AVAILABLE);
  });
  it('should not be able to make checkin if status is already AVAILABLE', () => {
    const inventory = InventoryFactory.make({ status: CopyStatus.AVAILABLE });
    expect(() => inventory.checkin()).toThrow(CopyIsAlreadyAvailableError);
  });
});
