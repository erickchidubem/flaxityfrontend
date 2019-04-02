import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { AddMachineComponent } from './add-machine/add-machine.component';
import { ViewMachineComponent } from './view-machine/view-machine.component';
import { MachineInfoComponent } from './machine-info/machine-info.component';

const routes: Routes = [ 
    {path : 'view-machine', component : ViewMachineComponent },
    {path : 'add-machine', component : AddMachineComponent},
    {path : 'edit-machine/:id', component : AddMachineComponent},
    {path : 'machine-info/:id', component : MachineInfoComponent} 
 ]; 

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot(), 
  ],
  exports : [RouterModule],
  declarations: [AddMachineComponent,ViewMachineComponent,MachineInfoComponent],

})
export class MaintenanceModule { }
