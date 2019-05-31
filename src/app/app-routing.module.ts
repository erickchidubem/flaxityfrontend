import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import {LoginComponent} from '../app/user-management/login/login.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
 

import { InternalAuthGuard } from './shared/auth-guards/internal-auth-guard';

import { BodyContentComponent } from './shared-layout/body-content/body-content.component';
import { HeaderComponent } from './shared-layout/header/header.component';
import { FooterComponent } from './shared-layout/footer/footer.component';
import { PrimarySidebarComponent } from './shared-layout/primary-sidebar/primary-sidebar.component';
import { SecondarySidebarComponent } from './shared-layout/secondary-sidebar/secondary-sidebar.component';
import { ResetPasswordComponent } from './user-management/reset-password/reset-password.component';
import { PasswordResetComponent } from './user-management/password-reset/password-reset.component';
 
const routes: Routes = [
  
    {path : '' , redirectTo: '/home', pathMatch:'full' },
    {path : 'home', component:LoginComponent},
    {path : 'login', component:LoginComponent},
    {path : 'reset-password', component : ResetPasswordComponent},
    {path : 'password-reset/:id/:date/:date2/:datediff', component : PasswordResetComponent},
    {path : 'access', component:BodyContentComponent, canActivate:[InternalAuthGuard], loadChildren : './logged-in/logged-in.module#LoggedInModule'},
    { path: 'error', loadChildren: './error-pages/error.module#ErrorModule' },
    {path : 'ticket', loadChildren : './tickets/tickets.module#TicketsModule'},
    {path : '**', redirectTo : '/error/400'},
    
  ];
 
  @NgModule({
    imports: [ 
      RouterModule.forRoot(routes, {useHash:true}),
      FormsModule,
      ReactiveFormsModule,
      BrowserModule,
      NgxUiLoaderModule,
      ToastrModule.forRoot(),
      PasswordStrengthMeterModule
      ],
    
    exports: [ 
      FormsModule,
      ReactiveFormsModule,
      NgxUiLoaderModule,
      RouterModule,
      ToastrModule,
    ],
   
    declarations :[
      LoginComponent,
      BodyContentComponent,
      HeaderComponent,
      FooterComponent,
      PrimarySidebarComponent,
      SecondarySidebarComponent,
      ResetPasswordComponent,
      PasswordResetComponent
    ]
    
  })
  export class AppRoutingModule {
  
  }
  