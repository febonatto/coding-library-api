import { Entity } from 'src/shared/core/abstract/entity';
import { MaxLengthError } from 'src/shared/core/errors/max-length.error';
import { NotEmptyError } from 'src/shared/core/errors/not-empty.error';
import { capitalize } from 'src/shared/utils/capitalize';

interface AuthorConstructorProps {
  name: string;
}

export class Author extends Entity<AuthorConstructorProps> {
  constructor(props: AuthorConstructorProps) {
    super(props);

    this.name = props.name;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    const transformedName = this.transformName(value);
    this.validateName(transformedName);
    this.props.name = transformedName;
  }

  private transformName(name: string): string {
    return capitalize(name.trim());
  }

  private validateName(name: string): void {
    if (name.length === 0) {
      throw new NotEmptyError('name');
    }
    if (name.length > 100) {
      throw new MaxLengthError('name', 100);
    }
  }
}
