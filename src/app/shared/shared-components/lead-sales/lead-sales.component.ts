import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-lead-sales',
  templateUrl: './lead-sales.component.html',
  styleUrls: ['./lead-sales.component.css']
})
export class LeadSalesComponent implements OnInit {

  constructor(private route : Router,public utils : Utils, private context : ContextService) { }


  @Input() accountId : any;
  @Input() userId : any;
  @Input() serviceId : any;
  allSales : any;

  ngOnInit() {
    this.getAllSalesInformation();
  }
  getAllSalesInformation(){

    this.utils.StartSpinner();
      this.context.getWithToken('/'+this.accountId+'/'+this.userId+'/5/'+this.serviceId,'sales/getsalessuminfo').
      subscribe( data => {
        let d = <any>data;
        this.allSales = d.data;
        
       
        console.log(d)
      this.utils.StopSpinner();
      });

  
  }


}
