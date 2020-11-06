import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestApiService} from '../services/rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Boat} from '../models/Boat';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.scss']
})
export class UpsertComponent implements OnInit {

  form: FormGroup;
  title:string="New boat";
  id:string;

  constructor(
    private formBuilder: FormBuilder,
    private api: RestApiService,
    public route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      name: [undefined, Validators.required],
      description: [undefined, Validators.required]
    });
    this.id = this.route.snapshot.paramMap.get("id");
  }

  async ngOnInit(): Promise<void> {
    if(this.id){
      try{
        let response = await this.api.get("/boat/"+this.id,{});
        let boat = new Boat(response);
        this.form.controls['name'].setValue(boat.name);
        this.form.controls['description'].setValue(boat.description);
        this.title = "Edit boat "+this.id;
      }catch(e){
      }
    }
  }

  async delete():Promise<void>{
    try{
      await this.api.get("/boat/delete/"+this.id);
      await this.router.navigateByUrl('/list');
    }catch(e){
      console.log(e);
    }
  }


  async save(): Promise<void>{
    try{
      let data = this.form.value;

      if(this.id){
        data.id = this.id;
      }
      await this.api.post("/boat/upsert",data);
      await this.router.navigateByUrl('/list');
    }catch(e){
      console.log(e);
    }
  }

}
