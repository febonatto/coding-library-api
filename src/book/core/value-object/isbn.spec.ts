import { ISBN } from './isbn';
import { DomainError } from 'src/shared/core/errors/domain.error';
import { LengthError } from 'src/shared/core/errors/length.error';

describe('ISBN Value Object', () => {
  it('should remove any hyphens or spaces from the ISBN input', () => {
    const isbnInput = '  978-3-16-148410-0 ';
    const isbn = new ISBN(isbnInput);
    expect(isbn.value).toBe('9783161484100');
  });
  it('should throw an error if the ISBN does not have 10 or 13 characters after sanitization', () => {
    expect(() => new ISBN('123')).toThrow(LengthError);
  });
  it('should check if the ISBN-13 check digit is valid', () => {
    expect(() => new ISBN('978-3-16-148410-1')).toThrow(DomainError);
  });
  it('should check if the ISBN-10 check digit is valid', () => {
    expect(() => new ISBN('0-306-40615-3')).toThrow(DomainError);
  });
  it('should convert a 10-digit ISBN to a new 13-digit ISBN instance', () => {
    const isbn10 = new ISBN('0-306-40615-2');
    const isbn13 = isbn10.to13Digit();
    expect(isbn10.value).toBe('0306406152');
    expect(isbn13.value).toBe('9780306406157');
  });
});
