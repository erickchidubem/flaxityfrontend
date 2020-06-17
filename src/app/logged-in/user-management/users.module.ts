import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {InternalUsersComponent} from '../user-management/internal-users/internal-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserTargetsComponent } from './user-targets/user-targets.component';
import { UserInfoComponent } from './user-info/user-info.component';
const routes: Routes = [
    {path: '', component : InternalUsersComponent } ,
    {path: 'create-user', component : CreateUserComponent} ,
    {path: 'edit-user/:id', component : CreateUserComponent},
    {path: 'change-password', component : ChangePasswordComponent},
    {path : 'user-tagert', component : UserTargetsComponent},
    {path : 'user-profile/:id/:name', component : UserInfoComponent}
]; 

@Pipe({ name: 'myPipe'})
export class MyPipe implements PipeTransform{
  transform(val) {
 
 return val.replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //  return val.toUpperCase()
  } 
}
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports : [RouterModule],
  declarations: [
    InternalUsersComponent,
    CreateUserComponent,
    ChangePasswordComponent,
    UserTargetsComponent, MyPipe, UserInfoComponent
    ],

})
export class UsersModule { }
