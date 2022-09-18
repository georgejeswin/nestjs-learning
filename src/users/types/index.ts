import { Exclude } from 'class-transformer';

export interface User {
  userName: string;
  password: string;
}

export class SerializedUser {
  userName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
