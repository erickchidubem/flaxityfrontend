import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {CdkTableModule } from '@angular/cdk/table';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import {CdkTableService} from '../../shared/shared-service/cdk-table';
import { MakeSalesComponent } from './make-sales/make-sales.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


const routes: Routes = [
   
    {path: 'make-sales', component : MakeSalesComponent},
    {path: 'edit-sales/:id', component : MakeSalesComponent},
    {path: 'service-call-sales/:serviceid/:accountid/:machineid', component:MakeSalesComponent},
    {path: 'invoice/:id', component: InvoiceComponent},
    {path : 'view-uncollected/:id', component : ViewOrdersComponent},
    {path : 'view-collected/:id/:name', component : ViewOrdersComponent},
  
]; 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxUiLoaderModule,
    ReactiveFormsModule,FormsModule,
    NgbModule, SweetAlert2Module.forRoot(),
    CdkTableModule,DlDateTimePickerDateModule,  
    OwlDateTimeModule, OwlNativeDateTimeModule,
  ],
  exports : [RouterModule],
  declarations: [
   
    MakeSalesComponent,
   
    InvoiceComponent,
   
    ViewOrdersComponent],

})
export class SalesModule { }
