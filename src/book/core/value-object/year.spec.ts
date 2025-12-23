import { DomainError } from 'src/shared/core/errors/domain.error';
import { Year } from './year';

describe('Year Value Object', () => {
  it('should throw an error if the year is less than 1450', () => {
    expect(() => new Year(1400)).toThrow(DomainError);
  });
  it('should throw an error if the year is after the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(() => new Year(currentYear + 1)).toThrow(DomainError);
  });
});
