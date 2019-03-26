import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';

@Component({
  selector: 'app-internal-users',
  templateUrl: './internal-users.component.html',
  styleUrls: ['./internal-users.component.css']
})
export class InternalUsersComponent implements OnInit {

  users : any=[];
  constructor(public utils : Utils,private context : ContextService) { }

  ngOnInit() {
    this.getAllUsers();
  }


  getAllUsers(){

    this.utils.StartSpinner();
      this.context.getWithToken('','user/getallinternaluser').
      subscribe( data => {
        let d = <any>data;
        this.users = d.data;
        console.log(d)
      this.utils.StopSpinner();
      });

  
  }

}
