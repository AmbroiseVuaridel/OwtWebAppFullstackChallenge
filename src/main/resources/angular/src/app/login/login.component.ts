import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../services/user-data.service';
import {Router} from '@angular/router';
import {User} from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userData: UserDataService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  async login(){
    console.log("logged in !");
    let user:User = new User({
      email :this.form.value.email,
      password :this.form.value.password,
      firstName :"test name"
    });
    await this.userData.login(user);
    console.log(this.userData.getUser());
    await this.router.navigateByUrl('/list');
  }

}
