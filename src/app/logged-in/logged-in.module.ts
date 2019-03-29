import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {CdkTableModule } from '@angular/cdk/table';
import {CdkTableService} from '../shared/shared-service/cdk-table';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
        
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },   
    { path: 'lead', loadChildren:'./leads/leads.module#LeadsModule'},
    { path: 'users', loadChildren : './user-management/users.module#UsersModule'},
    { path: 'products', loadChildren : './products/products.module#ProductsModule'},
    { path: 'sales', loadChildren : './sales/sales.module#SalesModule'},
    { path: 'settings', loadChildren : './settings/settings.module#SettingsModule'},
    { path: 'maintenance', loadChildren : './maintenance/maintenance.module#MaintenanceModule'},
]; 
@NgModule({
  imports: [
    
    CommonModule,
    RouterModule.forChild(routes),
    NgxUiLoaderModule,
    ReactiveFormsModule,FormsModule,
    NgbModule,// SweetAlert2Module.forRoot(),
    CdkTableModule,
  ],
  exports : [RouterModule],
  declarations: [
      DashboardComponent
      
    ],

})
export class LoggedInModule { }
