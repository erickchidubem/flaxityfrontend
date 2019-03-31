import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataPerPage, machineColumn } from 'src/app/shared/shared-service/tableColumns';
import { FormControl } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { CdkTableService } from 'src/app/shared/shared-service/cdk-table';

@Component({
  selector: 'app-view-machine',
  templateUrl: './view-machine.component.html',
  styleUrls: ['./view-machine.component.css']
})
export class ViewMachineComponent implements OnInit {

  private heros$;
  superlatives$ = new BehaviorSubject<{[superlativeName: string]: string}>({});
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  columns = machineColumn;
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(DataPerPage);
  dataOnPage$ = new BehaviorSubject<any[]>([]);
  searchFormControl = new FormControl();
  sortKey$ = new BehaviorSubject<string>('');
  sortDirection$ = new BehaviorSubject<string>('asc');


  allmachines : any=[];

  constructor(private context : ContextService,public utils : Utils, private cdktable : CdkTableService) { }

  ngOnInit() {
    
    this.getAllMachines();
    
  }

 

  getAllMachines(){

    this.utils.StartSpinner();
      this.context.getWithToken('','machine/getallmachine').
      subscribe( data => {
        let d = <any>data;
        this.allmachines = d.data;
        if(d.data == null){
          this.allmachines = {};
        }
        this.heros$ = new BehaviorSubject<{[name: string]: any}>(this.allmachines);
       // this.companyInformation = <any>data;
        this.cdktable.GenerateCDKTable(this.tableDataSource$,this.currentPage$, this.pageSize$,this.heros$,
        this.searchFormControl,this.sortKey$,this.sortDirection$,this.dataOnPage$)
        console.log(d)
      this.utils.StopSpinner();
      });

  
  }

}
