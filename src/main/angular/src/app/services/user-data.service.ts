import { Injectable } from '@angular/core';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  USER_STORAGE = 'user';
  public user: any;
  public userIsLoggedIn: boolean;
  constructor(

  ) {}

  public async login(user: any) {
    console.log('login gonna store ' + JSON.stringify(user));
    await this.setUser(user);
    this.userIsLoggedIn = true;
  }

  public async logout() {
    this.user = undefined;
    this.userIsLoggedIn = undefined;
    await localStorage.clear();
    window.location.reload();
  }

  public async setUser(user: any) {
    this.user = user;
    await localStorage.setItem(this.USER_STORAGE, JSON.stringify(user));
  }

  public async getUserFromLocalStorage() {
    try{
      this.user = JSON.parse(localStorage.getItem(this.USER_STORAGE));
      if(this.user){
        this.userIsLoggedIn=true;
      }
    }catch(e){
      this.logout();
    }
  }

  public getUser():User {
    return this.user;
  }

  public isLoggedIn():boolean {
    return this.userIsLoggedIn;
  }

}
