import { Component, OnInit, AfterViewInit, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-sales-trend-line-chart',
  templateUrl: './sales-trend-line-chart.component.html',
  styleUrls: ['./sales-trend-line-chart.component.css']
})
export class SalesTrendLineChartComponent implements OnInit {

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }
  
  private chart: am4charts.XYChart;
  
  RunFunnel(){
    let chart = am4core.create("chartdiv2", am4charts.XYChart);

    // Add data
    chart.data = [{
      "date": "2012-01-01",
      "value": 13
    }, {
      "date": "2012-02-01",
      "value": 11
    }, {
      "date": "2012-03-01",
      "value": 15
    }, {
      "date": "2012-04-01",
      "value": 16
    }, {
      "date": "2012-05-01",
      "value": 18
    }, {
      "date": "2012-06-01",
      "value": 13
    }, {
      "date": "2012-07-01",
      "value": 22
    }, {
      "date": "2012-08-01",
      "value": 23
    }, {
      "date": "2012-09-01",
      "value": 20
    }, {
      "date": "2012-10-01",
      "value": 17
    }, {
      "date": "2012-11-01",
      "value": 16
    }, {
      "date": "2012-12-01",
      "value": 18
    }
     ];
    
    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM";
    
    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"
    series.strokeWidth = 2;
    series.minBulletDistance = 15;
    
    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    
    // Make bullets grow on hover
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");
    
    let bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;
    
    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;
    
    // Create vertical scrollbar and place it before the value axis
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();
    
    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
  //  chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;
    
    chart.events.on("ready", function () {
      dateAxis.zoom({start:0.79, end:1});
    });
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
         this.RunFunnel();
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
