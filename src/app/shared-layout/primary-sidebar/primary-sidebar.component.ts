import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-sidebar',
  templateUrl: './primary-sidebar.component.html',
  styleUrls: ['./primary-sidebar.component.css']
})
export class PrimarySidebarComponent implements OnInit {

  userInfo : any=[];
  grantAccess : boolean = false;
  constructor(public utils : Utils, private context : ContextService,private router : Router) { }

  ngOnInit() {
    this.getUserInformation();
  }

  getUserInformation(){
    //this.utils.StartSpinner();
      this.context.postWithToken('','user/getinternaluser').
      subscribe( data => {
        let d = <any>data;
        this.userInfo = d.user;
       
        console.log(d.user)
        console.log(this.userInfo.changePassword) ;
        this.checkIfChangedPassword(this.userInfo.changePassword)
     //   this.utils.StopSpinner();
      }); 
  }

  checkIfChangedPassword(id){
    if(id == 0){
       this.router.navigate(["/access/users/change-password"]);
       this.grantAccess = false;
    }else{
      this.grantAccess = true;
    }
  }

}
