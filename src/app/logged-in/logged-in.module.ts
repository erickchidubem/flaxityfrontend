import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {CdkTableModule } from '@angular/cdk/table';
import {CdkTableService} from '../shared/shared-service/cdk-table';
import {SharedModule} from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
//import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { ServiceDashboardComponent } from './service-dashboard/service-dashboard.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';

const routes: Routes = [
        
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },   
    { path: 'lead', loadChildren:'./leads/leads.module#LeadsModule'},
    { path: 'users', loadChildren : './user-management/users.module#UsersModule'},
    { path: 'products', loadChildren : './products/products.module#ProductsModule'},
    { path: 'sales', loadChildren : './sales/sales.module#SalesModule'},
    { path: 'settings', loadChildren : './settings/settings.module#SettingsModule'},
    { path: 'maintenance', loadChildren : './maintenance/maintenance.module#MaintenanceModule'},
    { path: 'billing', loadChildren : './billing/billing.module#BillingModule'},
    { path: 'warehouse', loadChildren : './warehouse/warehouse.module#WarehouseModule'},
    {path: 'coming-soon', component : CommingSoonComponent}
]; 
@NgModule({
  imports: [
    
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgxUiLoaderModule,
    ReactiveFormsModule,FormsModule,
    NgbModule,// SweetAlert2Module.forRoot(),
    CdkTableModule,
  ],
  exports : [RouterModule],
  declarations: [
      DashboardComponent,
      ServiceDashboardComponent,
      CommingSoonComponent,
    ],

})
export class LoggedInModule { }
