import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import {RouterModule, Routes} from '@angular/router';
import { AgGridModule } from "ag-grid-angular";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([])
  ]
})
export class ListModule { }
