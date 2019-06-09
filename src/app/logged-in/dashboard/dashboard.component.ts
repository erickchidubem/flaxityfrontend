import { Component, OnInit } from "@angular/core";
import { ContextService } from "src/app/shared/shared-service/context.service";
import { Utils } from "src/app/shared/shared-service/utils";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId : any;
  viewType : any;
  ngOnInit() {
   
    let dptId  = this.context.UserProfile().departmentId;
    this.userId = this.context.UserProfile().id;

    if(dptId == 1){
      this.viewType == 1;
    }
    
    if(dptId == 3 || dptId == 4){
      this.viewType == 0;
      this.valueNum = 2;
    }

    if(dptId == 2){
        this.viewType = 1;
        this.valueNum = 1;
    }
  }

  constructor(public utils : Utils,private context : ContextService ) {}

  valueNum = 0;


  clickValue(d){
    this.valueNum = d;
  }

}
