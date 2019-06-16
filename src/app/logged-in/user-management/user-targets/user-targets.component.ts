import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userTargetsColumn, DataPerPage } from 'src/app/shared/shared-service/tableColumns';
import { FormControl } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { CdkTableService } from 'src/app/shared/shared-service/cdk-table';

declare var $ : any;
@Component({
  selector: 'app-user-targets',
  templateUrl: './user-targets.component.html',
  styleUrls: ['./user-targets.component.css']
})
export class UserTargetsComponent implements OnInit {

  private heros$;
  superlatives$ = new BehaviorSubject<{[superlativeName: string]: string}>({});
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  columns = userTargetsColumn;
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(DataPerPage);
  dataOnPage$ = new BehaviorSubject<any[]>([]);
  searchFormControl = new FormControl();
  sortKey$ = new BehaviorSubject<string>('');
  sortDirection$ = new BehaviorSubject<string>('asc');


  alllead : any=[];

  constructor(private context : ContextService,public utils : Utils, private cdktable : CdkTableService) { }

  ngOnInit() {
    
    this.getAllUsersTarget(0);
    
  }

 

  getAllUsersTarget(id:any){

    this.utils.StartSpinner();
      this.context.getWithToken('/'+id,'user/userTarget').
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
