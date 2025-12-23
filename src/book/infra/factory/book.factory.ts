import { faker } from '@faker-js/faker';
import { Author } from 'src/author/entity/author';

import { Book } from 'src/book/core/entity/book';
import { ISBN } from 'src/book/core/value-object/isbn';
import { Year } from 'src/book/core/value-object/year';

export class BookFactory {
  static make(overrides?: Partial<Book>): Book {
    return new Book({
      isbn: new ISBN('978-3-16-148410-0'),
      title: faker.book.title(),
      publicationYear: new Year(faker.date.past().getFullYear()),
      authors: [new Author({ name: faker.person.fullName() })],
      ...overrides,
    });
  }
}
