import { Entity } from "../../common/components/Entity";

export class User extends Entity<string> {
  private _roles: string[];

  constructor(username: string, roles: string[]) {
    super(username);
    this._roles = roles;
  }

  get roles(): string[] {
    return this._roles;
  }

  get username(): string {
    return this._id;
  }
}
