import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    private userData: UserDataService,
  ){

  }

  async ngOnInit(): Promise<void> {
    await this.userData.getUserFromLocalStorage();
    if(!this.userData.isLoggedIn()){
      await this.router.navigate(['login']);
    }else {
      await this.router.navigate(['list']);
    }
  }

}
