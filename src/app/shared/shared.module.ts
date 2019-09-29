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



import  {SelectModule} from 'ng-select';
import { LeadContactComponent } from './../shared/shared-components/lead-contact/lead-contact.component';
import { LeadSalesComponent } from './../shared/shared-components/lead-sales/lead-sales.component';
import { LeadSalesComponentComponent } from './../shared/shared-components/lead-sales/lead-sales-component/lead-sales-component.component';
import { ServiceCallsComponent } from './shared-components/service-calls/service-calls.component';
import { AllContractInfoComponent } from './shared-components/all-contract-info/all-contract-info.component';
import { LeadFunnelChartComponent } from './shared-components/charts/lead-funnel-chart/lead-funnel-chart.component';
import { SalesTrendLineChartComponent } from './shared-components/charts/sales-trend-line-chart/sales-trend-line-chart.component';
import { SalesQuickFlashComponent } from './shared-components/charts/sales-quick-flash/sales-quick-flash.component';
import { MonthlySalesAgainstTargetComponent } from './shared-components/charts/monthly-sales-against-target/monthly-sales-against-target.component';
import { SalesDashboardComponent } from '../logged-in/sales-dashboard/sales-dashboard.component';



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
        LeadFunnelChartComponent,
        SalesTrendLineChartComponent,
        SalesQuickFlashComponent,

        MonthlySalesAgainstTargetComponent,
        SalesDashboardComponent,
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
       LeadContactComponent,  LeadSalesComponent, 
       LeadSalesComponentComponent, ServiceCallsComponent,
        AllContractInfoComponent, LeadFunnelChartComponent, 
        SalesTrendLineChartComponent, SalesQuickFlashComponent, MonthlySalesAgainstTargetComponent, 
        SalesDashboardComponent,
  ],
  
  })
  export class SharedModule { }