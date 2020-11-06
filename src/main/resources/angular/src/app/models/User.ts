export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;


  constructor(obj){
    this.id = obj.id;
    this.username = obj.username;
    this.email = obj.email;
    this.password = obj.password;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.token = obj.token;
  }


}
