import { MaxLengthError } from 'src/shared/core/errors/max-length.error';
import { InvalidEmailError } from 'src/shared/core/errors/member/invalid-email.error';
import { NotEmptyError } from 'src/shared/core/errors/not-empty.error';

export class Email {
  private readonly emailRegex =
    /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9-]*\.)+[a-z]{2,}$/;
  private _value: string;

  constructor(value: string) {
    const normalizedValue = this.normalize(value);
    this.validate(normalizedValue);
    this._value = normalizedValue;
  }

  get value(): string {
    return this._value;
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }
  private validate(value: string): void {
    if (value.length === 0) {
      throw new NotEmptyError('email');
    }
    if (!this.emailRegex.test(value)) {
      throw new InvalidEmailError();
    }
    if (value.length > 255) {
      throw new MaxLengthError('email', 255);
    }
  }
}
