import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import {AddLeadsComponent} from './add-leads/add-leads.component';
import {ViewAllLeadsComponent} from './view-all-leads/view-all-leads.component';
import { LeadInfoComponent } from './lead-info/lead-info.component';
import { ViewMyLeadsComponent } from './view-my-leads/view-my-leads.component';
import { ViewAllAccountsComponent } from './view-all-accounts/view-all-accounts.component';
import { LeadStoryComponent } from './lead-info/lead-story/lead-story.component';
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
    SharedModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot()
  ],

  exports : [RouterModule],
 
  declarations: [
     AddLeadsComponent,ViewAllLeadsComponent,
     LeadInfoComponent, ViewMyLeadsComponent, 
     ViewAllAccountsComponent, LeadStoryComponent, 
     AccountMachineComponent, LeadSalesComponent, 
     LeadSalesComponentComponent,   
   ],

})
export class LeadsModule { }
