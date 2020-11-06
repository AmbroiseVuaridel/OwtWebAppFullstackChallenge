import { Component, OnInit } from '@angular/core';
import {Boat} from '../models/Boat';
import {RestApiService} from '../services/rest-api.service';
import { Router} from '@angular/router';
import {UserDataService} from '../services/user-data.service';

let that;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  gridOptions:any = {
    columnDefs: [
      { headerName: 'id', field: 'id' ,flex: 1},
      { headerName: 'Nom', field: 'name', flex: 3},
      { headerName: 'Description', field: 'description', flex: 6}
    ],
    onRowClicked: function(event) {
      let id = event.data.id;
      that.router.navigateByUrl('/upsert/'+id);
    }

  };
  rowData:any[]=[];
  private boats:Boat[]=[];

  constructor(
    private userData: UserDataService,
    private router: Router,
    private api: RestApiService,
  ) {
    that = this;
  }

  async ngOnInit(): Promise<void> {
    let response = await this.api.get("/boat/all",{});
    this.boats = this.api.instantiate(response,Boat);
    console.log(this.boats);
    this.rowData=[];
    for(let boat of this.boats){
      console.log(boat);
      let newData:any = {};
      newData.id = boat.id;
      newData.name = boat.name;
      newData.description = boat.description;
      this.rowData.push(newData);
    }
  }


  async addBtnClicked(): Promise<void>{
    await this.router.navigateByUrl('/upsert');
  }

  async logout(){
    await this.userData.logout();
  }

}
