import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataPerPage, serviceCallColumn } from '../../shared-service/tableColumns';
import { FormControl } from '@angular/forms';
import { ContextService } from '../../shared-service/context.service';
import { Utils } from '../../shared-service/utils';
import { ActivatedRoute } from '@angular/router';
import { CdkTableService } from '../../shared-service/cdk-table';

@Component({
  selector: 'app-service-calls',
  templateUrl: './service-calls.component.html',
  styleUrls: ['./service-calls.component.css']
})
export class ServiceCallsComponent implements OnInit {

  private heros$;
  superlatives$ = new BehaviorSubject<{[superlativeName: string]: string}>({});
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  columns = serviceCallColumn;
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(DataPerPage);
  dataOnPage$ = new BehaviorSubject<any[]>([]);
  searchFormControl = new FormControl();
  sortKey$ = new BehaviorSubject<string>('');
  sortDirection$ = new BehaviorSubject<string>('asc');


  allSales : any;
  id : any;
  allSalesName : any;
  name : any;


  @Input() accountId : any;
  @Input() machineId : any;
  @Input() engineerId : any;
  @Input() startdate : any;
  @Input() enddate : any;
  @Input() closed : any;

  constructor(private context : ContextService,public utils : Utils, private route : ActivatedRoute,
    private cdktable : CdkTableService) { }

  ngOnInit() {
     this.name = this.route.params['value'].name;
    this.id = this.route.params['value'].id;
    if(this.id == null){this.id = 0;}
    if(this.name == null && this.id == 0){this.name = "UNCOLLECTED ORDERS";}
    if(name != null){this.allSalesName = "View All Sales for "+name;}else{this.allSalesName = "View All Orders made ";}
    this.getAllSales();
  }

 

  getAllSales(){

    ///maintenance/allservicecalls/{accountid}/{machineid}/{startdate}/{enddate}/{closed}/{engineerid}
    this.utils.StartSpinner();
      this.context.getWithToken('/'+this.accountId+'/'+this.machineId+'/'+this.startdate+'/'+this.enddate+'/'+this.closed+'/'+this.engineerId,
      'maintenance/allservicecalls').
      subscribe( data => {
        let d = <any>data;
        this.allSales = d.data;
        if(d.data == null){
          this.allSales = {};
        }
        this.heros$ = new BehaviorSubject<{[name: string]: any}>(this.allSales);
        this.cdktable.GenerateCDKTable(this.tableDataSource$,this.currentPage$, this.pageSize$,this.heros$,
        this.searchFormControl,this.sortKey$,this.sortDirection$,this.dataOnPage$)
        console.log(d)
      this.utils.StopSpinner();
      });

  
  }
}
