import { Author } from 'src/author/entity/author';
import { ISBN } from '../value-object/isbn';
import { Year } from '../value-object/year';
import { Entity } from 'src/shared/core/abstract/entity';
import { NotEmptyError } from 'src/shared/core/errors/not-empty.error';
import { MaxLengthError } from 'src/shared/core/errors/max-length.error';

interface BookConstructorProps {
  isbn: ISBN;
  title: string;
  publicationYear: Year;
  authors: Author[];
}

export class Book extends Entity<BookConstructorProps> {
  constructor(props: BookConstructorProps) {
    super(props);
    this.props.isbn = props.isbn;
    this.props.publicationYear = props.publicationYear;

    this.title = props.title;
    this.authors = props.authors;
  }

  get title(): string {
    return this.props.title;
  }
  get authors(): Author[] {
    return this.props.authors;
  }

  private set title(title: string) {
    const formattedTitle = title.trim();
    this.validateTitle(formattedTitle);
    this.props.title = formattedTitle;
  }
  private set authors(authors: Author[]) {
    this.validateAuthors(authors);
    this.props.authors = authors;
  }

  private validateTitle(value: string): void {
    if (value.length === 0) {
      throw new NotEmptyError('title');
    }
    if (value.length > 500) {
      throw new MaxLengthError('title', 500);
    }
  }
  private validateAuthors(authors: Author[]): void {
    if (authors.length === 0) {
      throw new NotEmptyError('authors');
    }
  }
}
