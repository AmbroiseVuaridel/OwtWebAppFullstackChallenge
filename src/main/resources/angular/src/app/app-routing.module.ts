import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'upsert', loadChildren: () => import('./upsert/upsert.module').then(m => m.UpsertModule)},// canActivate: [AuthGuard]
  { path: 'upsert/:id', loadChildren: () => import('./upsert/upsert.module').then(m => m.UpsertModule)},// canActivate: [AuthGuard]
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule)}// canActivate: [AuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
