export class AuthUser {
  id;
  handle;
  name;
  email;
  image;
  constructor(user) {
    this.id = user.id;
    this.handle = user.handle;
    this.name = user.name;
    this.email = user.email;
    this.image = user.image;
  }
}
