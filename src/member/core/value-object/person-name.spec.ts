import { PersonName } from './person-name';
import { InvalidPersonNameError } from 'src/shared/core/errors/member/invalid-person-name.error';

describe('Person Name Value Object', () => {
  it('should has at least one space to be a valid full name (name and last surname)', () => {
    expect(() => new PersonName('John')).toThrow(InvalidPersonNameError);
  });
  it('should be able to create a person name with at two or more names', () => {
    expect(new PersonName('John Doe')).toBeInstanceOf(PersonName);
    expect(new PersonName('John Michael Doe')).toBeInstanceOf(PersonName);
  });
  it('should replace two or more spaces between names with a single space', () => {
    const personName = new PersonName('John    Michael   Doe');
    expect(personName.value).toBe('John Michael Doe');
  });
  it('should format the name properly (trim and capitalize)', () => {
    const personName = new PersonName('  john   doe  ');
    expect(personName.value).toBe('John Doe');
  });
});
