import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {CdkTableModule } from '@angular/cdk/table';
//import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import {CdkTableService} from '../../shared/shared-service/cdk-table';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ToastrModule } from 'ngx-toastr';
import { AddMachineComponent } from './add-machine/add-machine.component';
import { ViewMachineComponent } from './view-machine/view-machine.component';
 
const routes: Routes = [
  
    { path: 'view-machine', component : ViewMachineComponent },
    {path : 'add-machine', component : AddMachineComponent},
    {path : 'edit-machine/:id', component : AddMachineComponent},
  
 ]; 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxUiLoaderModule,
    ReactiveFormsModule,FormsModule,
    NgbModule, SweetAlert2Module.forRoot(),
    CdkTableModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    PasswordStrengthMeterModule,
    ToastrModule.forRoot()
    
  ],
  exports : [RouterModule],
  declarations: [
      
AddMachineComponent,
      
ViewMachineComponent],

})
export class MaintenanceModule { }
