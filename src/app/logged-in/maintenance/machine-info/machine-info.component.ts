import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machine-info',
  templateUrl: './machine-info.component.html',
  styleUrls: ['./machine-info.component.css']
})
export class MachineInfoComponent implements OnInit {

  constructor(public utils : Utils,private context : ContextService,
    private route: ActivatedRoute) { }

  leadInfo : any=[];
  id : any = this.route.params['value'].id;

  tbPercentage ="30%";
  ngOnInit() {
    this.getLeadInformation(this.id);
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
