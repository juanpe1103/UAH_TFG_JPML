export class SignUpInfo {
  name: string;
  username: string;
  password: string;
  role: string[];

  constructor(name: string, username: string, password: string) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.role = ['admin'];
  }
}
