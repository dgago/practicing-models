export interface IPrincipal {
  tenantId: string;
  username: string;
  roles: ReadonlyArray<string>;
}
