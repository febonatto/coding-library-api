import { DomainError } from 'src/shared/core/errors/domain.error';

export class Year {
  private _value: number;

  constructor(value: number) {
    this.validate(value);
    this._value = value;
  }

  private validate(value: number): void {
    if (value < 1450) {
      throw new DomainError('Year must be 1450 or later');
    }

    const currentYear = new Date().getFullYear();
    if (value > currentYear) {
      throw new DomainError('Year cannot be in the future');
    }
  }
}
