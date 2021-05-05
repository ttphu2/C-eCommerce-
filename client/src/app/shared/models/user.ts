export class IUser {
  id: string;
  email: string;
  displayName: string;
  token: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  phone: string;

}

export interface IUserProfile {
    displayName: string;
    firstName: string;
    lastName: string;
    birthday: string;
    gender: string;
    phone: string;
}

export interface IChangePassword {
  password: string;
  rePassword: string;
}
export class ChangePasswordFormValues implements IChangePassword {
  password: "";
  rePassword: "";
  constructor(init?: ChangePasswordFormValues) {
    Object.assign(this, init);
  }
}

export class UserProfileFormValues implements IUserProfile {
  displayName: "";
  firstName: "";
  lastName: "";
  birthday: "";
  gender: "";
  phone: "";
  constructor(init?: UserProfileFormValues) {
    Object.assign(this, init);
  }
}

