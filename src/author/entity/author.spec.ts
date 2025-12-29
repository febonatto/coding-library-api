import { NotEmptyError } from 'src/shared/core/errors/not-empty.error';
import { Author } from './author';
import { MaxLengthError } from 'src/shared/core/errors/max-length.error';
import { PersonName } from 'src/shared/core/value-object/person-name';

describe('Author Entity', () => {
  it('should generate an id upon creation', () => {
    const author = new Author({ name: new PersonName('John Doe') });
    expect(author.id).toBeDefined();
  });
  it('should trim and capitalize the name', () => {
    const author = new Author({ name: new PersonName('  john doe  ') });
    expect(author.name).toBe('John Doe');
  });
  it('should throw an error if name is empty', () => {
    expect(() => new Author({ name: new PersonName('') })).toThrow(
      NotEmptyError,
    );
  });
  it('should throw an error if name has more than 100 characters', () => {
    const longName = 'a'.repeat(101);
    expect(() => new Author({ name: new PersonName(longName) })).toThrow(
      MaxLengthError,
    );
  });
});
