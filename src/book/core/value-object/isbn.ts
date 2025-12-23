import { DomainError } from 'src/shared/core/errors/domain.error';
import { LengthError } from 'src/shared/core/errors/length.error';

export class ISBN {
  private _value: string;

  constructor(value: string) {
    const sanitizedValue = this.sanitize(value);
    this.validate(sanitizedValue);
    this._value = sanitizedValue;
  }

  get value(): string {
    return this._value;
  }

  public toString(): string {
    return this._value.replace(
      /^(\d{3})(\d{1})(\d{2})(\d{6})(\d{1})$/,
      '$1-$2-$3-$4-$5',
    );
  }

  public to13Digit(): ISBN {
    if (this._value.length === 13) {
      return this;
    }

    const prefixedValue = '978' + this._value.slice(0, 9);
    const lastDigit = this.calculateISBN13CheckDigit(prefixedValue);

    return new ISBN(prefixedValue + lastDigit);
  }

  private sanitize(value: string): string {
    return value.replace(/[-\s]/g, '');
  }

  private validate(value: string): void {
    if (![10, 13].includes(value.length)) {
      throw new LengthError('ISBN', '10 or 13');
    }
    if (value.length === 13 && !this.isValidISBN13(value)) {
      throw new DomainError('Invalid ISBN-13 check digit');
    }
    if (value.length === 10 && !this.isValidISBN10(value)) {
      throw new DomainError('Invalid ISBN-10 check digit');
    }
  }

  private calculateISBN13CheckDigit(value: string): number {
    const digits = value.split('').map((digit) => parseInt(digit, 10));
    const sum = digits.reduce((acc, digit, index) => {
      return acc + digit * (index % 2 === 0 ? 1 : 3);
    }, 0);
    const remainder = sum % 10;
    const checkDigit = 10 - remainder;
    return checkDigit === 10 ? 0 : checkDigit;
  }

  private isValidISBN13(value: string): boolean {
    const providedCheckDigit = parseInt(value.charAt(12), 10);
    if (isNaN(providedCheckDigit)) {
      return false;
    }

    const calculatedCheckDigit = this.calculateISBN13CheckDigit(
      value.slice(0, 12),
    );
    return providedCheckDigit === calculatedCheckDigit;
  }

  private isValidISBN10(value: string): boolean {
    if (!/^\d{9}[\dX]$/.test(value)) {
      return false;
    }

    const digits = value
      .split('')
      .map((char) => (char === 'X' ? 10 : parseInt(char, 10)));
    const sum = digits.reduce(
      (acc, digit, index) => acc + digit * (10 - index),
      0,
    );
    return sum % 11 === 0;
  }
}
