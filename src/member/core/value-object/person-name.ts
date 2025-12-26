import { InvalidPersonNameError } from 'src/shared/core/errors/member/invalid-person-name.error';
import { capitalize } from 'src/shared/utils/capitalize';

export class PersonName {
  private _value: string;

  constructor(value: string) {
    const name = value.trim().replace(/\s+/g, ' ');
    const transformedName = capitalize(name);

    if (!/\s+/.test(transformedName)) {
      throw new InvalidPersonNameError();
    }

    this._value = transformedName;
  }

  get value(): string {
    return this._value;
  }
}
