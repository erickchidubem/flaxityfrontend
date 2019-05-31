import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { ServiceTicketComponent } from './service-ticket/service-ticket.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SupplyTicketsComponent } from './supply-tickets/supply-tickets.component';


const routes: Routes = [
  
    { path:'invoice/:id', component : InvoiceComponent },
    { path : 'service-call/:id', component:ServiceTicketComponent}
    
 ]; 


@NgModule({ 
  
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot()
  ],

  exports : [RouterModule],
 
  declarations: [
    
   ServiceTicketComponent,InvoiceComponent,SupplyTicketsComponent
],

})
export class TicketsModule { }
