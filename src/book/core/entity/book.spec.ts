import { BookFactory } from 'src/book/infra/factory/book.factory';
import { MaxLengthError } from 'src/shared/core/errors/max-length.error';
import { NotEmptyError } from 'src/shared/core/errors/not-empty.error';

describe('Book Entity', () => {
  it('should generate an id upon creation', () => {
    const book = BookFactory.make();
    expect(book.id).toBeDefined();
  });
  it('should title be trimmed', () => {
    const book = BookFactory.make({ title: '  A Great Book  ' });
    expect(book.title).toBe('A Great Book');
  });
  it('should throw an error if title is empty', () => {
    expect(() => BookFactory.make({ title: '   ' })).toThrow(NotEmptyError);
  });
  it('should throw an error if title has more than 500 characters', () => {
    const longTitle = 'a'.repeat(501);
    expect(() => BookFactory.make({ title: longTitle })).toThrow(
      MaxLengthError,
    );
  });
  it('should not be able to create a book without any authors', () => {
    expect(() => BookFactory.make({ authors: [] })).toThrow(NotEmptyError);
  });
});
