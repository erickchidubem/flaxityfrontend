import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { productsColumn, DataPerPage } from 'src/app/shared/shared-service/tableColumns';
import { FormControl } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { CdkTableService } from 'src/app/shared/shared-service/cdk-table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent implements OnInit {

  private heros$;
  superlatives$ = new BehaviorSubject<{[superlativeName: string]: string}>({});
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  columns = productsColumn;
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(DataPerPage);
  dataOnPage$ = new BehaviorSubject<any[]>([]);
  searchFormControl = new FormControl();
  sortKey$ = new BehaviorSubject<string>('');
  sortDirection$ = new BehaviorSubject<string>('asc');


  allProduct : any;
  id : any;
  allProductName : any;
  constructor(private context : ContextService,public utils : Utils, private route : ActivatedRoute,
    private cdktable : CdkTableService) { }

  ngOnInit() {
    let name = this.route.params['value'].name;
    this.id = this.route.params['value'].id;
    if(this.id == null){this.id = 0;}
    if(name != null){this.allProductName = "View All Products for "+name;}else{this.allProductName = "View All Products ";}
    this.getAllProducts(this.id);
  }

 

  getAllProducts(id){

    this.utils.StartSpinner();
      this.context.getWithToken(id,'product/getproductsbytype/').
      subscribe( data => {
        let d = <any>data;
        this.allProduct = d.data;
        if(d.data == null){
          this.allProduct = {};
        }
        this.heros$ = new BehaviorSubject<{[name: string]: any}>(this.allProduct);
       // this.companyInformation = <any>data;
        this.cdktable.GenerateCDKTable(this.tableDataSource$,this.currentPage$, this.pageSize$,this.heros$,
        this.searchFormControl,this.sortKey$,this.sortDirection$,this.dataOnPage$)
        console.log(d)
      this.utils.StopSpinner();
      });

  
  }

}
