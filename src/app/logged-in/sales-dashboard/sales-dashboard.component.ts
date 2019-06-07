import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.css']
})
export class SalesDashboardComponent implements OnInit {

  @Input() userId : any;
  @Input() viewType : any;
  constructor() { }

  ngOnInit() {
  }

}
