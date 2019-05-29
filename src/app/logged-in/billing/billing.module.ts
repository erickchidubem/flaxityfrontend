import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { CreateContractComponent } from './create-contract/create-contract.component';
import { AddMachineContractComponent } from './add-machine-contract/add-machine-contract.component';
import {GenerateBillingComponent} from './generate-billing/generate-billing.component';
import { CreateContractDetailsComponent } from './create-contract-details/create-contract-details.component';
const routes: Routes = [ 
    {path : 'create-contract', component : CreateContractComponent },
    {path : 'edit-contract/:id', component : CreateContractComponent },
    {path : 'view-contract-info/:id/:id2', component : CreateContractComponent },
    {path : 'add-machine', component : AddMachineContractComponent},
    {path : 'generate-billing/:id', component : GenerateBillingComponent}
   
 ]; 

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot(), 
  ],
  exports : [RouterModule],
  declarations: [
      CreateContractComponent,
      AddMachineContractComponent,
      GenerateBillingComponent,
      CreateContractDetailsComponent
],

})
export class BillingModule { }
