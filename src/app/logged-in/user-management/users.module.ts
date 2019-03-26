import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {CdkTableModule } from '@angular/cdk/table';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import {CdkTableService} from '../../shared/shared-service/cdk-table';
import {InternalUsersComponent} from '../user-management/internal-users/internal-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

const routes: Routes = [
    {path: '', component : InternalUsersComponent } ,
    {path: 'create-user', component : CreateUserComponent} ,
    {path: 'edit-user/:id', component : CreateUserComponent},
    {path: 'change-password', component : ChangePasswordComponent}
]; 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxUiLoaderModule,
    ReactiveFormsModule,FormsModule,
    NgbModule,// SweetAlert2Module.forRoot(),
    CdkTableModule,DlDateTimePickerDateModule,
    PasswordStrengthMeterModule
    
  ],
  exports : [RouterModule],
  declarations: [
    InternalUsersComponent,
    CreateUserComponent,
    ChangePasswordComponent
    ],

})
export class UsersModule { }
