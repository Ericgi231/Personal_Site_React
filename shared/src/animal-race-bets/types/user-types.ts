export enum AccountType {
  Guest = 'guest',
  Registered = 'registered',
  Invalid = 'invalid'
}

export interface UserData {
  id: number;
  type: AccountType;
  name: string;
  balance: number;
}