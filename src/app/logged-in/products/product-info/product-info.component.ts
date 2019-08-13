import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { BehaviorSubject } from 'rxjs';
import { productsLogColumn, DataPerPage } from 'src/app/shared/shared-service/tableColumns';
import { CdkTableService } from 'src/app/shared/shared-service/cdk-table';
declare var $:any;
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
 
  roleId = this.context.UserProfile().roleId;
  departmentId = this.context.UserProfile().departmentId;
  store = this.context.UserProfile().store;
  id : any;
  editCreateHeader : string;
  productInfo : any;

  ProductStoreQty : any;
  storeCheckId : any;
  TotalProductStoreQty : any;


  stocksubmitted : any;

  formStockAdd : FormGroup;
  constructor(private route : ActivatedRoute,public utils : Utils,private router : Router,
    private toaster : ToasterService, private cdktable : CdkTableService,
    private context : ContextService,private fb : FormBuilder) { }


  ngOnInit() {
    this.stocksubmitted = false;
    this.id = this.route.params['value'].id;
    this.getEditInformation(this.id);
    this.generateStockAddForm(this.id);
    this.getProductLog(this.id);
  }
  //$productId,$storeId,$qty,$createdBy,$description
  generateStockAddForm(id){
    this.formStockAdd = this.fb.group({
      productId : [id,Validators.required],
      storeId : ['',Validators.required],
      qty : ['',Validators.required],
      description : ['',Validators.required],
      addremovereturn : ['add']
    });
  }

  patchStockAdd(storeId){
    this.formStockAdd.patchValue({
        storeId : storeId
    });
  }


  getEditInformation(id){
    
    if(id > 0){
     // this.utils.StartSpinner();
      this.context.getWithToken(id,'product/getproduct/').
      subscribe( data => {
        let d = <any>data;
        this.editCreateHeader= d.data.productName+"'s Information";  
        this.productInfo = d.data;    
        console.log(d.data)
   //     this.utils.StopSpinner();
      });
        
    }else{
          this.router.navigate(['/access/products/view-all-products'])
    }

  }



  private heros$;
  superlatives$ = new BehaviorSubject<{[superlativeName: string]: string}>({});
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  columns = productsLogColumn;
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(DataPerPage);
  dataOnPage$ = new BehaviorSubject<any[]>([]);
  searchFormControl = new FormControl();
  sortKey$ = new BehaviorSubject<string>('');
  sortDirection$ = new BehaviorSubject<string>('asc');


  allProductLog : any=[];


  getProductLog(id){
    
    if(id > 0){
      this.context.getWithToken(id,'product/getproductlogproduct/').
      subscribe( data => {
        let d = <any>data;
        this.allProductLog = d.data;
        if(d.data == null){
          this.allProductLog = {};
        }
        this.heros$ = new BehaviorSubject<{[name: string]: any}>(this.allProductLog);
        this.cdktable.GenerateCDKTable(this.tableDataSource$,this.currentPage$, this.pageSize$,this.heros$,
        this.searchFormControl,this.sortKey$,this.sortDirection$,this.dataOnPage$)
      
        console.log(d.data)
      });       
    }
  }

  SubmitStock(){
    this.stocksubmitted = true;
    console.log(this.formStockAdd.value);
    if(this.formStockAdd.invalid){
      this.utils.invalidFormMessage();
      return;
    }

    this.utils.StartSpinner();
    let formData = JSON.stringify(this.formStockAdd.value);

    this.context.postWithToken(formData, 'product/addremovereturnproductitem').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.Success(d.message);
        
        }else{
          this.toaster.Error(d.message);

        }
        this.ngOnInit();
        $('#addStockToStore').modal("hide");
        console.log(data);
      })
  }


  get f(){return this.formStockAdd.controls;}

  showModalInfo(storeId,qty){
    this.stocksubmitted = false;
    this.ProductStoreQty = qty;
    this.storeCheckId = storeId;
    this.patchStockAdd(storeId);
  }
}
