import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-service-ticket',
  templateUrl: './service-ticket.component.html',
  styleUrls: ['./service-ticket.component.css']
})
export class ServiceTicketComponent implements OnInit {
  constructor(public utils : Utils,private context : ContextService, 
    private route: ActivatedRoute) { }

  serviceInfo : any=[];
  followUp : any[];
  id : any = this.route.params['value'].id;
  engineers : any[];
  machinecase : any[];

  departmentId : any;
  userid : any;

  allowFollowUp : any[] = [3,4];

 
  ngOnInit() {
    this.departmentId = this.context.UserProfile().departmentId;
    this.userid = this.context.UserProfile().id;
    this.getLeadInformation(this.id);
  
  }

  getLeadInformation(id){
  
      this.context.getWithToken(id,'maintenance/getsingleservicecall/').
      subscribe( data => {
        let d = <any>data;
        this.serviceInfo = d.data1;
        this.followUp = d.data2;
        console.log(d)
       
      }); 

      this.context.getWithToken('','maintenance/getmaintenancesetup').
      subscribe( data => {
        let d = <any>data;
        this.engineers = d.data3;
        //this.machineIssue = d.data2;
      //  this.optionalizeIssues(d.data2);
        this.machinecase = d.data1;
      
      }); 
  }


 

}
