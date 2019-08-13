import { Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-sales-trend-line-chart',
  templateUrl: './sales-trend-line-chart.component.html',
  styleUrls: ['./sales-trend-line-chart.component.css']
})
export class SalesTrendLineChartComponent implements OnInit {

  ngOnInit() {
  }
  
  RunFunnel(){
   
   
  }

  public pieChartLabels:string[] = ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"];
  public pieChartData:number[] = [21, 39, 10, 14, 16];
  public pieChartType:string = 'pie';
  public pieChartOptions:any = {'backgroundColor': [
               "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
            ]}
 
  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }
 
 // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }

 
}
