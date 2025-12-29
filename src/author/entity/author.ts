import { Entity } from 'src/shared/core/abstract/entity';
import { PersonName } from 'src/shared/core/value-object/person-name';

interface AuthorConstructorProps {
  name: PersonName;
}

export class Author extends Entity<AuthorConstructorProps> {
  constructor(props: AuthorConstructorProps) {
    super(props);
  }

  get name(): string {
    return this.props.name.value;
  }
}
