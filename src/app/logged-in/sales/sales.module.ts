import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { MakeSalesComponent } from './make-sales/make-sales.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { MySalesRecordComponent } from './my-sales-record/my-sales-record.component';


const routes: Routes = [
   
    {path: 'make-sales', component : MakeSalesComponent},
    {path: 'edit-sales/:id', component : MakeSalesComponent},
    {path: 'service-call-sales/:serviceid/:accountid/:machineid', component:MakeSalesComponent},
    {path: 'invoice/:id', component: InvoiceComponent},
    {path : 'view-uncollected/:id', component : ViewOrdersComponent},
    {path : 'view-collected/:id/:name', component : ViewOrdersComponent},
    {path : 'my-sales-record', component : MySalesRecordComponent}
  
]; 
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports : [RouterModule],
  declarations: [
   
    MakeSalesComponent,
   
    InvoiceComponent,
   
    ViewOrdersComponent,
   
    MySalesRecordComponent],

})
export class SalesModule { }
