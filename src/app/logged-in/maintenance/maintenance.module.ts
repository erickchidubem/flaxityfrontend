import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { AddMachineComponent } from './add-machine/add-machine.component';
import { ViewMachineComponent } from './view-machine/view-machine.component';
import { MachineInfoComponent } from './machine-info/machine-info.component';
import { MakeServiceCallComponent } from './make-service-call/make-service-call.component';
import { AllServiceCallComponent } from './all-service-call/all-service-call.component';

const routes: Routes = [ 
    {path : 'view-machine', component : ViewMachineComponent },
    {path : 'add-machine', component : AddMachineComponent},
    {path : 'edit-machine/:id', component : AddMachineComponent},
    {path : 'machine-info/:id', component : MachineInfoComponent},
    {path : 'make-service-call', component : MakeServiceCallComponent },
    {path : 'edit-service-call/:id', component : MakeServiceCallComponent},
    {path : 'all-service-call', component : AllServiceCallComponent}
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
    AddMachineComponent,ViewMachineComponent,
    MachineInfoComponent, MakeServiceCallComponent, AllServiceCallComponent
  ],

})
export class MaintenanceModule { }
