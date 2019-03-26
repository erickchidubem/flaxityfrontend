import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead-info',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.component.css']
})
export class LeadInfoComponent implements OnInit {

  constructor(public utils : Utils,private context : ContextService,
    private route: ActivatedRoute) { }

  leadInfo : any=[];
  tbPercentage ="30%";
  ngOnInit() {
    let id = this.route.params['value'].id;
    this.getLeadInformation(id);
  }

  getLeadInformation(id){
    this.utils.StartSpinner();
      this.context.getWithToken(id,'account/viewleadinfo/').
      subscribe( data => {
        let d = <any>data;
        this.leadInfo = d.data;
        console.log(d.data)
        this.utils.StopSpinner();
      }); 
  }
 
}
