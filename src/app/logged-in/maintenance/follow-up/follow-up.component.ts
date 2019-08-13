import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  constructor(private context : ContextService,public utils : Utils) { }

  info : any=[];

  accountId : any=0;
  machineId : any=0;
  engineerId : any=0;
  startdate : any=0;
  enddate : any=0;
  closed : any=3;
  followup : any=1;
  ngOnInit() {
    this.getLog();
  }

  getLog(){
    this.context.getWithToken('/'+this.accountId+'/'+this.machineId+'/'+this.startdate+'/'+this.enddate+'/'+this.closed+'/'+this.engineerId+'/'+this.followup,
    'maintenance/allservicecallsreport').
    subscribe( data => {
      let d = <any>data;
        this.info = d.data;
        console.log(d)
      });
 
  }
}
