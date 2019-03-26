import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import {CdkTableModule } from '@angular/cdk/table';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';


const routes: Routes = [
     {path: 'product-category', component : AddEditCategoryComponent } ,
]; 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxUiLoaderModule,
    ReactiveFormsModule,FormsModule,
    NgbModule,// SweetAlert2Module.forRoot(),
    CdkTableModule,DlDateTimePickerDateModule,  
  ],
  exports : [RouterModule],
  declarations: [
    AddEditCategoryComponent
    
    ],

})
export class SettingsModule { }
