import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { salesColumn, DataPerPage } from 'src/app/shared/shared-service/tableColumns';
import { FormControl } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ActivatedRoute } from '@angular/router';
import { CdkTableService } from 'src/app/shared/shared-service/cdk-table';

@Component({
  selector: 'app-lead-sales-component',
  templateUrl: './lead-sales-component.component.html',
  styleUrls: ['./lead-sales-component.component.css']
})
export class LeadSalesComponentComponent implements OnInit {

  private heros$;
  superlatives$ = new BehaviorSubject<{[superlativeName: string]: string}>({});
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  columns = salesColumn;
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
  @Input() userId : any;
  @Input() salesType : any;
  @Input() serviceId : any;


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

    this.utils.StartSpinner();
      this.context.getWithToken('/'+this.accountId+'/'+this.userId+'/'+this.salesType+'/'+this.serviceId,'sales/getaccountuserssales').
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
      //this.utils.StopSpinner();
      });

  
  }
}