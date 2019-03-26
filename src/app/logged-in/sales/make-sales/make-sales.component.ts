import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-make-sales',
  templateUrl: './make-sales.component.html',
  styleUrls: ['./make-sales.component.css']
})
export class MakeSalesComponent implements OnInit {

  form : FormGroup;
  constructor(private fb : FormBuilder,private context : ContextService,public utils : Utils,
    private toaster : ToasterService,private router : Router, private route: ActivatedRoute) { }

    id : any;
    submitted : boolean = false;
    categoryList : any =[];
    productList : any =[];
    categoryProductList : any =[];

    accountList : any=[];
    machineList : any=[];
    accountMachineList : any =[];


    onArrayList : any = [];
    onLineList : any=[];

    editCreateHeader : string ;

    startCounter : number = 0;
    FinalTotalAmount : any = 0;

    countOnline : number = 0;
 
    submitted2 : boolean = false;
    ngOnInit() {
        this.submitted = false;
        this.submitted2 = false;
        this.startCounter = 0;
        this.SalesId = 0;
        this.generateForm();
        this.getAllSalesInformation();
        let id = this.route.params['value'].id;
        if(id>0){
          this.getSalesInfo(id);
        }
        
  }

  SalesId :number = 0;
  accountId = 0;
  machineId = 0;
  discount = "0";
  vat = 0;
  description = 'some description';
  servicecall_id : number = 0;

SubmitSales(){


this.submitted2 = true;
  

    if(this.onLineList.length == 0 && this.onArrayList.length == 0){//check if other values are correctly entered
      this.toaster.Error("add items to the list to sell")
      return;
    }

    if(this.accountId ==0 || this.description == ""){
      if(this.accountId == 0){
        this.toaster.Error("Please select and Account")
      }
      if(this.description == ""){
        this.toaster.Error("Please enter a description")
      }
      return;
    }
    if(this.discount =="" || this.discount == null){
      this.discount = "0";
      console.log("i did it")
    }
   this.utils.StartSpinner();
  let formData =JSON.stringify({
      id : this.SalesId,account_id:this.accountId,machine_id : this.machineId,
      discount : this.discount,vat : this.vat,servicecall_id:this.servicecall_id,
      description:this.description,
      salesdetails : this.onArrayList
    });
console.log(formData);
    this.context.postWithToken(formData, 'sales/createeditsales').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        console.log(d);
        if(d.error == false){
          this.toaster.Success(d.message);
          this.router.navigate(['/access/sales/invoice/'+d.sales_id])
      
          
        }else{
          this.toaster.Error(d.message);
        }
        console.log(data);
      }, err => {
        this.utils.StopSpinner();
       
        if(err.status == 422){
          this.toaster.Error(err.error.message);
        }
        console.log('Error Message : '+err.message);
        console.log('Error : '+err.status);
        console.log( err.error);   

        }
    );
}

  generateForm(){
    this.form = this.fb.group({
      id : ['0'],
      category : ['',Validators.required],
      product : ['', Validators.required],
      unitPrice : ['',Validators.required],
      qty : ['',Validators.required],
    });
  }

  get f(){return this.form.controls;}

 


  deleteFromArray(id){
    let index =this.onArrayList.find(x=>x.productId == id);
    console.log(index.finalTotal);
    console.log(index)
    console.log(this.onArrayList)
    this.onArrayList = this.utils.removeArray(this.onArrayList,index);
    console.log(this.onArrayList)
    
    this.FinalTotalAmount = this.FinalTotalAmount-index.finalTotal;
    this.startCounter = this.startCounter - 1; 
  }

  getSellingPrice(value){
    let product = value.split('|');
    let my_price = product[2];
    this.form.patchValue({unitPrice : my_price})

  }

  getsubCategory(thisvalue){
    let id = thisvalue.split('|')[0];
    this.allProductSelect =this.allProduct.filter(x=>x.product_type_id == id);
    this.form.patchValue({unitPrice:'',qty : ''});
  }

  alllead : any=[];
  productType : any=[];
  allProduct : any=[];
  allProductSelect : any=[];
 
  getAllSalesInformation(){
      this.utils.StartSpinner(); 
      
      this.context.getWithToken('','account/viewallleads').
      subscribe( data => {
        let d = <any>data;
        this.alllead = d.data;
        console.log(d)
      });

      this.context.getWithToken("0",'product/getproductsbytype/').
      subscribe( data => {
        let d = <any>data;
        this.allProduct = d.data;
        console.log(d)
      });

      this.context.getWithToken('','product/getallproductstype').
        subscribe( data => {
          let d = <any>data;
          this.productType = d.data;
        //  this.productType2 = d.data2;
          console.log(d)
        }); 


      this.utils.StopSpinner();
  }

  salesInfo : any =[];
  salesDetails : any =[];


  addSalesFromDB(d :any){
    for(let i=0; i < d.length; i++){
      console.log(d);
      this.onLineList.push({
        id : d[i].id,category : d[i].category,productId : d[i].products_id, 
        productName : d[i].productName,
        unitPrice:d[i].amount,qty : d[i].qty,finalTotal : d[i].total
      })
      this.FinalTotalAmount = parseFloat(this.FinalTotalAmount) + parseFloat(d[i].total); 
    }
    this.countOnline = d.length;
 }



  getSalesInfo(id){
    this.context.getWithToken(id,'sales/getsinglesales/').
    subscribe( data => {
      let d = <any>data;
      this.salesInfo = d.data.salesInfo;
      this.salesDetails = d.data.salesdetails;
      this.SalesId = d.data.salesInfo.id;
      this.accountId = d.data.salesInfo.account_id;
      this.machineId = d.data.salesInfo.machine_id;
      this.discount = d.data.salesInfo.discount;
      this.vat = d.data.salesInfo.vat;

      this.addSalesFromDB(d.data.salesdetails); 
      console.log(d)
    });
  }

  addProduct(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    let q =  this.form.get('qty').value;

    if(q == 0){
      this.toaster.Error("Please enter a valid quantity");
      return;
    }

   
  //  console.log(this.form.value);
    let id = this.form.get('id').value;
    let categoryValue = this.form.get('category').value.split('|');
    let category = categoryValue[1];
    let product = this.form.get('product').value.split('|');
    let productId = product[0];
    let productName = product[1];
    let unitPrice = this.form.get('unitPrice').value;
    let qty = this.form.get('qty').value;
    let finalTotal : any = qty * unitPrice;

    let check = this.onLineList.filter(x=>x.productId == productId);
    let check2 =  this.onArrayList.find(x=>x.productId == productId);
   console.log(check)
   console.log(check2)

   if((check=== undefined || check.length == 0) && (check2=== undefined || check2.length == 0)){
 
      this.onArrayList.push({id : id,category : category,productId : productId, productName : productName,unitPrice:unitPrice,qty : qty,finalTotal : finalTotal });
      this.startCounter += 1;
      this.FinalTotalAmount = parseFloat(this.FinalTotalAmount) + parseFloat(finalTotal); 

      console.log(this.FinalTotalAmount)
      console.log(finalTotal)

      this.form.patchValue({ id : this.startCounter,category: '',product : '', unitPrice:'', qty :''});
      this.submitted = false;
      console.log(this.onArrayList);

    }else{
      this.toaster.Error("This product is already existing on this list")
    }
   
  }

}
