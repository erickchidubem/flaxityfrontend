import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class InternalAuthGuard implements CanActivate,CanActivateChild {
   jwtHelper = new JwtHelperService();
  constructor(private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var token = localStorage.getItem("token");   
    console.log(token);
    if(token != null){
      if (!this.jwtHelper.isTokenExpired(token)){
          //confirm token again db
            return true;
          }
    }    
     this.router.navigate(["login"]);
     return false;
  }
  
  
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    var token = localStorage.getItem("token");   
    console.log(token);
    if(token != null){
      if (!this.jwtHelper.isTokenExpired(token)){
            return true;
          }
    }    
     this.router.navigate(["login"]);
     return false;
  }
}
