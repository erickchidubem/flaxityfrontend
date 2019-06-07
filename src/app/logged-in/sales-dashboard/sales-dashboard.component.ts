import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.css']
})
export class SalesDashboardComponent implements OnInit {

  @Input() userId : any;
  @Input() viewType : any;
  theDate = new Date();
  DateString : any;
  constructor(public datepipe : DatePipe) { 
    this.DateString =this.datepipe.transform(this.theDate,'yyyy-MM-dd');
  }

  ngOnInit() {
    
  }

}
