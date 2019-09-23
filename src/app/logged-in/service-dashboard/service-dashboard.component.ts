import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-service-dashboard',
  templateUrl: './service-dashboard.component.html',
  styleUrls: ['./service-dashboard.component.css']
})
export class ServiceDashboardComponent implements OnInit {

  constructor(public utils : Utils, private context : ContextService) { }

  data1 : any;
  ngOnInit() {
    this.getFigures()
  }



   getFigures(){

    this.utils.StartSpinner();
      this.context.getWithToken('','maintenance/getServiceDashboard').
      subscribe( data => {
        let d = <any>data;
        this.data1 = d.data1;
          console.log(this.data1);
        this.utils.StopSpinner();
      });

  
  }
}
