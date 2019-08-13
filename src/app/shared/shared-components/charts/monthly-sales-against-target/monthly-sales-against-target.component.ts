import { Component, OnInit, Input } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';

@Component({
  selector: 'app-monthly-sales-against-target',
  templateUrl: './monthly-sales-against-target.component.html',
  styleUrls: ['./monthly-sales-against-target.component.css']
})
export class MonthlySalesAgainstTargetComponent implements OnInit {

  @Input() userId;
  targetHeader : any;
  allMonths = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  allMonthNum = [1,2,3,4,5,6,7,8,9,10,11,12];
  year : any=[];
  constructor(public utils : Utils, private context : ContextService) { }

  ngOnInit() {
    var lastDate = 2018;
    var thisYear = new Date();
    this.targetHeader = thisYear.getFullYear();
    this.SalesYearHeader = thisYear.getFullYear();
    for(let i = 2018; i <= thisYear.getFullYear(); i++){
      this.year.push(i);
     
    }
    console.log(this.userId)
    this.getMonthlySalesTarget(this.userId,thisYear.getFullYear())
    this.getMonthlySales(this.userId,thisYear.getFullYear());
  }

  setJustTargetYear(value){
    this.targetHeader = value;
    this.getMonthlySalesTarget(this.userId,value)
  }


  SalesYearHeader : any;
  setSalesYear(value){
    this.SalesYearHeader = value;
    this.getMonthlySales(this.userId,value)
  }


  targetInfo : any;
  getMonthlySalesTarget(userId,year){

    this.utils.StartSpinner();
    this.context.getWithToken('/'+userId+'/'+year,'user/userTarget').
      subscribe( data => {
        let d = <any>data;
        this.targetInfo = d.data; 
        console.log(d)
        this.utils.StopSpinner();
      });

  
  }

  targetInfo2:any;
  getMonthlySales(userId,year){

    this.utils.StartSpinner();
    this.context.getWithToken('/'+userId+'/'+year,'sales/getSalesInformationTarget').
      subscribe( data => {
        let d = <any>data;
        this.targetInfo2 = d.data; 
        console.log(d)
        this.utils.StopSpinner();
      });

  
  }

}
