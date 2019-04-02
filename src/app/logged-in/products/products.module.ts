import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { CreateProductComponent } from './create-product/create-product.component';
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
    SharedModule,
    RouterModule.forChild(routes),
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot(), 
    
  ],
  exports : [RouterModule],
  declarations: [
    CreateProductComponent,
    ViewAllProductsComponent,
    ProductInfoComponent
],

})
export class ProductsModule { }
