import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { ServiceTicketComponent } from './service-ticket/service-ticket.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SupplyTicketsComponent } from './supply-tickets/supply-tickets.component';
import { DeliveryTicketComponent } from './delivery-ticket/delivery-ticket.component';


const routes: Routes = [
  
    { path:'invoice/:id', component : InvoiceComponent },
    { path : 'service-call/:id', component:ServiceTicketComponent},
    { path : 'delivery-note/:id/:salesid', component : DeliveryTicketComponent}
    
 ]; 


@NgModule({ 
  
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot()
  ],

  exports : [RouterModule],
 
  declarations: [
    
   ServiceTicketComponent,InvoiceComponent,SupplyTicketsComponent, DeliveryTicketComponent
],

})
export class TicketsModule { }
