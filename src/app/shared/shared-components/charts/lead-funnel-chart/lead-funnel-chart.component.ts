import { Component, OnInit, AfterViewInit, NgZone, Input } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import { ContextService } from "src/app/shared/shared-service/context.service";
import { Utils } from "src/app/shared/shared-service/utils";
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dataviz);

@Component({
  selector: 'app-lead-funnel-chart',
  templateUrl: './lead-funnel-chart.component.html',
  styleUrls: ['./lead-funnel-chart.component.css']
})
export class LeadFunnelChartComponent implements OnInit {
  @Input() userId : any;
  @Input() viewType : any;
  constructor(private zone: NgZone,private context : ContextService,public utils : Utils) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.context.getWithToken('/'+0+'/'+this.userId+'/5/'+0,'sales/getsalessuminfo').
    subscribe( data => {
      let d = <any>data;
      this.salesInfo = d.data;
      console.log(d)
    
    });
  }
  
  private chart: am4charts.XYChart;
  
  RunFunnel(d :any){
    let chart = am4core.create("chartdiv", am4charts.SlicedChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

chart.data = d;

let series = chart.series.push(new am4charts.FunnelSeries());
series.colors.step = 2;
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;

series.labelsContainer.paddingLeft = 15;
series.labelsContainer.width = 200;

//series.orientation = "horizontal";
//series.bottomRatio = 1;

chart.legend = new am4charts.Legend();
chart.legend.position = "left";
chart.legend.valign = "bottom";
chart.legend.margin(5,5,20,5)
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
         this.getLeadStages();
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  salesInfo : any=[];
  getLeadStages(){
    this.context.getWithToken(this.userId+'/'+this.viewType,'account/leadstagecount/').
    subscribe( data => {
      let d = <any>data;
      this.RunFunnel(d.data);
      console.log(d.data)
     
    }); 

  
}

}
