import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Error400Component} from './error400/error400.component';
import {Error401Component} from './error401/error401.component';
import {Error500Component} from './error500/error500.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : Error500Component},
  { path: '400', component: Error400Component },
  { path: '401', component: Error401Component },
  { path: '500', component: Error500Component },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule],
  declarations: [Error400Component,Error401Component,Error500Component]
})
export class ErrorModule { }
