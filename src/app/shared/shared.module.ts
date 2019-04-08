import { NgModule } from '@angular/core';
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
import { LeadContactComponent } from '../logged-in/leads/lead-info/lead-contact/lead-contact.component';

@NgModule({
    imports: [
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
  ],
  
  })
  export class SharedModule { }