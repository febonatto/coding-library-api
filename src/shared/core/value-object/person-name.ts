import { InvalidPersonNameError } from 'src/shared/core/errors/member/invalid-person-name.error';
import { capitalize } from 'src/shared/utils/capitalize';
import { NotEmptyError } from '../errors/not-empty.error';
import { MaxLengthError } from '../errors/max-length.error';

export class PersonName {
  private _value: string;

  constructor(value: string) {
    const name = value.trim().replace(/\s+/g, ' ');
    const transformedName = capitalize(name);

    if (!transformedName) {
      throw new NotEmptyError('name');
    }

    if (transformedName.length > 100) {
      throw new MaxLengthError('name', 100);
    }

    if (!/\s+/.test(transformedName)) {
      throw new InvalidPersonNameError();
    }

    this._value = transformedName;
  }

  get value(): string {
    return this._value;
  }
}
