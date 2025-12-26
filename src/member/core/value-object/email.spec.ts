import { InvalidEmailError } from 'src/shared/core/errors/member/invalid-email.error';
import { Email } from './email';
import { MaxLengthError } from 'src/shared/core/errors/max-length.error';
import { NotEmptyError } from 'src/shared/core/errors/not-empty.error';

describe('Email Value Object', () => {
  it('should throw an error for invalid email input', () => {
    expect(() => new Email('plainaddress')).toThrow(InvalidEmailError);
    expect(() => new Email('#@%^%#$@#$@#.com')).toThrow(InvalidEmailError);
    expect(() => new Email('@example.com')).toThrow(InvalidEmailError);
    expect(() => new Email('email.example.com')).toThrow(InvalidEmailError);
    expect(() => new Email('.email@example.com')).toThrow(InvalidEmailError);
    expect(() => new Email('email.@example.com')).toThrow(InvalidEmailError);
    expect(() => new Email('email..email@example.com')).toThrow(
      InvalidEmailError,
    );
  });
  it('should normalize email to lowercase and trim spaces', () => {
    const email = new Email('  ExAmPle@Email.Com  ');
    expect(email.value).toBe('example@email.com');
  });
  it('should throw an error if email exceeds maximum length', () => {
    const longEmail = 'a'.repeat(250) + '@example.com';
    expect(() => new Email(longEmail)).toThrow(MaxLengthError);
  });
  it('should throw an error if email has two consecutive dots', () => {
    expect(() => new Email('email..test@example.com')).toThrow(
      InvalidEmailError,
    );
  });
  it('should throw an error if email is empty', () => {
    expect(() => new Email('   ')).toThrow(NotEmptyError);
  });
});
