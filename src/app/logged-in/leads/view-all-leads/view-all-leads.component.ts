import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import {leadsColumn,DataPerPage} from '../../../shared/shared-service/tableColumns';
import { CdkTableService } from 'src/app/shared/shared-service/cdk-table';


declare var $ : any;

@Component({ 
  selector: 'app-view-all-leads',
  templateUrl: './view-all-leads.component.html',
  styleUrls: ['./view-all-leads.component.css']
})
export class ViewAllLeadsComponent implements OnInit {

  private heros$;
  superlatives$ = new BehaviorSubject<{[superlativeName: string]: string}>({});
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  columns = leadsColumn;
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
      this.context.getWithToken('','account/viewallleads').
      subscribe( data => {
        let d = <any>data;
        this.alllead = d.data; 
        if(d.data == null){
          this.alllead = {};
        }
        this.heros$ = new BehaviorSubject<{[name: string]: any}>(this.alllead);
       // this.companyInformation = <any>data;
        this.cdktable.GenerateCDKTable(this.tableDataSource$,this.currentPage$, this.pageSize$,this.heros$,
        this.searchFormControl,this.sortKey$,this.sortDirection$,this.dataOnPage$)
        console.log(d)
      this.utils.StopSpinner();
      });

  
  }

} 
