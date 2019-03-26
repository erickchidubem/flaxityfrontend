import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import {HttpModule} from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { CdkTableModule } from '@angular/cdk/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import {Constants} from '../app/shared/shared-service/constants';
import {Utils} from '../app/shared/shared-service/utils';
import {ToasterService} from '../app/shared/shared-service/toaster.service';
import {ContextService} from './shared/shared-service/context.service';

import {CdkTableService} from './shared/shared-service/cdk-table';
import { GlobalErrorHandlerService } from './shared/shared-service/global-error-handler';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';
//import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({

  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,NgxUiLoaderModule,
    RouterModule,
    BrowserModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,
    HttpModule, ToastrModule.forRoot(),
    CdkTableModule,
    NgbModule, SweetAlert2Module.forRoot(),
   // OwlDateTimeModule, OwlNativeDateTimeModule,
     
  ],
  providers: [
    Constants,
    ToasterService,
    Utils,
    ContextService,
    GlobalErrorHandlerService,
    CdkTableService,
    
    { 
      provide:  ErrorHandler, 
      useClass: GlobalErrorHandlerService 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
