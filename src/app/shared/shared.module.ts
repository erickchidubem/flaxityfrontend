import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {CdkTableModule } from '@angular/cdk/table';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ToastrModule } from 'ngx-toastr';
//import { NgSelectModule } from '@ng-select/ng-select';
 
import  {SelectModule} from 'ng-select';
import { LeadContactComponent } from './../shared/shared-components/lead-contact/lead-contact.component';
import { LeadSalesComponent } from './../shared/shared-components/lead-sales/lead-sales.component';
import { LeadSalesComponentComponent } from './../shared/shared-components/lead-sales/lead-sales-component/lead-sales-component.component';
import { ServiceCallsComponent } from './shared-components/service-calls/service-calls.component';
import { AllContractInfoComponent } from './shared-components/all-contract-info/all-contract-info.component';



@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      NgxUiLoaderModule,
      ReactiveFormsModule,FormsModule,
      NgbModule,
      SweetAlert2Module.forRoot(),
      CdkTableModule,
      OwlDateTimeModule, OwlNativeDateTimeModule,
      PasswordStrengthMeterModule,
      ToastrModule.forRoot(),
      SelectModule
     // HttpClientModule,HttpModule
    ],
    exports : [
        LeadContactComponent,
        LeadSalesComponent, 
        LeadSalesComponentComponent, 
        ServiceCallsComponent,
        AllContractInfoComponent,
        CommonModule,
        NgxUiLoaderModule,
        ReactiveFormsModule,FormsModule,
        NgbModule,
        CdkTableModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        PasswordStrengthMeterModule,SelectModule
       // HttpClientModule,HttpModule,
       
    ],
    declarations: [
       LeadContactComponent, 
       LeadSalesComponent, 
       LeadSalesComponentComponent, ServiceCallsComponent, AllContractInfoComponent, 
  ],
  
  })
  export class SharedModule { }