export class LoginModel {
  countryCode!: string;
  phoneNumber!: string;
  password!: string;
  loginBy!: string;
}

export class LoginResponse {
  secret_token!: string;
  refresh_token!: string;
  id!: number;
  data!: any;
  user_type!: number;
}

export interface RootObject {
  yohStatus: number;
  data: LoginResponse;
  message: string;
}