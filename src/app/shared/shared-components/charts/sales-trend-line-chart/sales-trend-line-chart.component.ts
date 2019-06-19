import { Component, OnInit, AfterViewInit, NgZone } from "@angular/core";

@Component({
  selector: 'app-sales-trend-line-chart',
  templateUrl: './sales-trend-line-chart.component.html',
  styleUrls: ['./sales-trend-line-chart.component.css']
})
export class SalesTrendLineChartComponent implements OnInit {

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }
  
  RunFunnel(){
   
   
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
         this.RunFunnel();
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
     
    });
  }
}
