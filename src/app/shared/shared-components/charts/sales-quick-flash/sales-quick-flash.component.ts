import { Component, OnInit, Input } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';

@Component({
  selector: 'app-sales-quick-flash',
  templateUrl: './sales-quick-flash.component.html',
  styleUrls: ['./sales-quick-flash.component.css']
})
export class SalesQuickFlashComponent implements OnInit {
  @Input() userId : any;
  @Input() theDate : any;
  constructor(public utils : Utils, private context : ContextService) { }

  ngOnInit() {
    this.getData();
  }

  salesInfo : any =[];
  getData(){
    this.context.getWithToken('/'+this.userId+'/'+this.theDate,'sales/getallsalesinformation').
    subscribe( data => {
      let d = <any>data;
      this.salesInfo = d.data[0];
      console.log(d.data[0])
    
    });
  }
 
}
