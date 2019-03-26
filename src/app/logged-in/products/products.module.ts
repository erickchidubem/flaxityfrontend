import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {CdkTableModule } from '@angular/cdk/table';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import {CdkTableService} from '../../shared/shared-service/cdk-table';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { CreateProductComponent } from './create-product/create-product.component';
import { ToastrModule } from 'ngx-toastr';
import { ViewAllProductsComponent } from './view-all-products/view-all-products.component';
import { ProductInfoComponent } from './product-info/product-info.component';

const routes: Routes = [
  
    {path: 'create-product', component : CreateProductComponent} ,
    {path: 'edit-product/:id', component : CreateProductComponent },
    {path: 'view-all-products', component : ViewAllProductsComponent},
    {path: 'view-product-category/:id/:name', component : ViewAllProductsComponent},
    {path: 'product-info/:id', component : ProductInfoComponent}
 ]; 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxUiLoaderModule,
    ReactiveFormsModule,FormsModule,
    NgbModule,// SweetAlert2Module.forRoot(),
    CdkTableModule,DlDateTimePickerDateModule,
    PasswordStrengthMeterModule,
    ToastrModule.forRoot()
    
  ],
  exports : [RouterModule],
  declarations: [
    CreateProductComponent,
    ViewAllProductsComponent,
    ProductInfoComponent
],

})
export class ProductsModule { }
