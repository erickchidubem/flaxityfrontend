import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { ShipItemsComponent } from './ship-items/ship-items.component';

const routes: Routes = [
     {path: 'ship-item', component : ShipItemsComponent } ,
    // {path: 'create-user', component : CreateUserComponent} ,
    // {path: 'edit-user/:id', component : CreateUserComponent},
    // {path: 'change-password', component : ChangePasswordComponent},
    // {path : 'user-tagert', component : UserTargetsComponent}
]; 

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports : [RouterModule],
  declarations: [

    ShipItemsComponent],

})
export class WarehouseModule { }
