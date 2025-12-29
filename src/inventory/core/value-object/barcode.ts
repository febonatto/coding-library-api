import { DomainError } from 'src/shared/core/errors/domain.error';

interface BarcodeConstructorProps {
  acquisitionYear: number;
  sequence: number;
}

export class Barcode {
  private readonly foundationYear = 2000;
  private readonly start = 'CLB';
  private _value: string;

  constructor({ acquisitionYear, sequence }: BarcodeConstructorProps) {
    if (acquisitionYear < this.foundationYear) {
      throw new DomainError(
        `Acquisition year must be ${this.foundationYear} or later`,
      );
    }
    const formattedSequence = this.transformSequence(sequence);
    const verificationDigit =
      this.calculateVerificationDigit(formattedSequence);
    this._value = `${this.start}-${acquisitionYear}-${formattedSequence}-${verificationDigit}`;
  }

  get value(): string {
    return this._value;
  }

  private transformSequence(sequence: number): string {
    return sequence.toString().padStart(6, '0');
  }

  private calculateVerificationDigit(sequence: string): number {
    const digits = sequence.split('').map((digit) => parseInt(digit, 10));
    const sum = digits.reduce(
      (acc, digit, index) => acc + digit * (6 - index),
      0,
    );
    return sum % 10;
  }
}
