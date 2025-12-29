import { DomainError } from 'src/shared/core/errors/domain.error';
import { Barcode } from './barcode';

describe('Barcode Value Object', () => {
  it('should start with CLB followed by acquisition year, 6 digit sequence number and a verification digit', () => {
    const barcode = new Barcode({ acquisitionYear: 2024, sequence: 42 });
    expect(barcode.value).toMatch(/^CLB-2024-000042-0$/);
  });
  it('should acquisition year be after foundation date of the library', () => {
    expect(() => new Barcode({ acquisitionYear: 1999, sequence: 1 })).toThrow(
      DomainError,
    );
  });
});
