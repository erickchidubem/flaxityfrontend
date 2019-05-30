import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { contractSummary, DataPerPage } from '../../shared-service/tableColumns';
import { FormControl } from '@angular/forms';
import { ContextService } from '../../shared-service/context.service';
import { Utils } from '../../shared-service/utils';
import { CdkTableService } from '../../shared-service/cdk-table';

@Component({
  selector: 'app-all-contract-info',
  templateUrl: './all-contract-info.component.html',
  styleUrls: ['./all-contract-info.component.css']
})
export class AllContractInfoComponent implements OnInit {

  @Input() accountId : any;
  private heros$;
  superlatives$ = new BehaviorSubject<{[superlativeName: string]: string}>({});
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  columns = contractSummary;
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(DataPerPage);
  dataOnPage$ = new BehaviorSubject<any[]>([]);
  searchFormControl = new FormControl();
  sortKey$ = new BehaviorSubject<string>('');
  sortDirection$ = new BehaviorSubject<string>('asc');


  alllead : any=[];

  constructor(private context : ContextService,public utils : Utils, private cdktable : CdkTableService) { }

  ngOnInit() {
    
    this.getAllLeads();
    
  }

 

  getAllLeads(){

    this.utils.StartSpinner();
      this.context.getWithToken('0/'+this.accountId,'billing/getcontractinfo/').
      subscribe( data => {
        let d = <any>data;
        console.log(d)
        this.alllead = d.data;
        if(d.data == null){
          this.alllead = {};
        }
        this.heros$ = new BehaviorSubject<{[name: string]: any}>(this.alllead);
        this.cdktable.GenerateCDKTable(this.tableDataSource$,this.currentPage$, this.pageSize$,this.heros$,
        this.searchFormControl,this.sortKey$,this.sortDirection$,this.dataOnPage$)
      this.utils.StopSpinner();
      });

  
  }
}