import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {CdkTableModule } from '@angular/cdk/table';
//import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import {CdkTableService} from '../../shared/shared-service/cdk-table';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ToastrModule } from 'ngx-toastr';
import {AddLeadsComponent} from './add-leads/add-leads.component';
import {ViewAllLeadsComponent} from './view-all-leads/view-all-leads.component';
import { LeadInfoComponent } from './lead-info/lead-info.component';
import { ViewMyLeadsComponent } from './view-my-leads/view-my-leads.component';
import { ViewAllAccountsComponent } from './view-all-accounts/view-all-accounts.component';
import { LeadStoryComponent } from './lead-info/lead-story/lead-story.component';
import { LeadContactComponent } from './lead-info/lead-contact/lead-contact.component';
import { AccountMachineComponent } from './lead-info/account-machine/account-machine.component';
import { LeadSalesComponent } from './lead-info/lead-sales/lead-sales.component';
import { LeadSalesComponentComponent } from './lead-info/lead-sales/lead-sales-component/lead-sales-component.component';
const routes: Routes = [
  
    { path: 'add-lead', component : AddLeadsComponent },
    { path: 'edit-lead/:id', component : AddLeadsComponent},
    { path: 'view-lead/:id', component : LeadInfoComponent},
    { path: 'view-all-lead', component : ViewAllLeadsComponent },
    { path: 'view-my-lead', component : ViewMyLeadsComponent},
    { path: 'view-all-account', component : ViewAllAccountsComponent},
 ]; 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxUiLoaderModule,
    ReactiveFormsModule,FormsModule,
    NgbModule,// SweetAlert2Module.forRoot(),
    CdkTableModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    PasswordStrengthMeterModule,
    ToastrModule.forRoot()
    
  ],
  exports : [RouterModule],
  declarations: [
    AddLeadsComponent,ViewAllLeadsComponent,
    LeadInfoComponent, ViewMyLeadsComponent, 
    ViewAllAccountsComponent, LeadStoryComponent, LeadContactComponent, AccountMachineComponent, LeadSalesComponent, LeadSalesComponentComponent,
    
],

})
export class LeadsModule { }
