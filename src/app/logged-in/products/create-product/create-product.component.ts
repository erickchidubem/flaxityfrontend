import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private fb : FormBuilder,private context : ContextService,public utils : Utils,
    private toaster : ToasterService,private router : Router, private route: ActivatedRoute) { }

  id : any;
  submitted : boolean = false;
  productType : any =[];
  productType2 : any =[];
  productTypeLoad : any =[];
  editCreateHeader : string ;

  ngOnInit() {
    this.submitted = false;
    this.generateForm();
    this.GetProductType();
    this.id = this.route.params['value'].id;
    this.getEditInformation(this.id);
  }

  get f() {return this.form.controls;}

 
  form : FormGroup;
  generateForm(){
    this.form = this.fb.group({
      id : [0],
      product_type_id : ['',Validators.required],
      product_sub_id : ['', Validators.required],
      productName : ['',Validators.required],
      code : ['',Validators.required],
      costPrice : ['',Validators.required],
      sellingPrice : ['',Validators.required],
      active : ['',Validators.required],
      unit : ['',Validators.required],
      qtyAlert : ['',Validators.required]
    });
  }

  upDateFormInformation(d : any){
    this.getsubCategory(d.product_type_id)
    this.form.patchValue({
      id : d.id,
    
      product_type_id : d.product_type_id,
      product_sub_id : d.product_sub_id,
      productName : d.productName,
      code : d.code,
      costPrice : d.costPrice,
      sellingPrice : d.sellingPrice,
      active : d.active,
      unit : d.unit,
      qtyAlert : d.qtyAlert
    });
  }


  getEditInformation(id){
    
    if(id > 0){
      this.utils.StartSpinner();
      this.context.getWithToken(id,'product/getproduct/').
      subscribe( data => {
        let d = <any>data;
        this.editCreateHeader= "Edit "+d.data.productName;
        this.upDateFormInformation(d.data);
        console.log(d.data)
        this.utils.StopSpinner();
      });
        
    }else{
      this.editCreateHeader = "Create New Product";
    }

  }

  Register(){
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.invalid){
      this.utils.invalidFormMessage();
      return;
    }

    this.utils.StartSpinner();
    let formData = JSON.stringify(this.form.value);

    this.context.postWithToken(formData, 'product/createeditproduct').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.Success(d.message);
        
          if(this.id > 0){
              this.router.navigate(['/access/products/product-info/'+this.id])
            }else{
              this.router.navigate(['/access/products/view-all-products']);
            }
          
        }else{
          this.toaster.Error(d.message);
        }
        console.log(data);
      },
      err => {
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


  getsubCategory(id){
    console.log(id);
     
      this.form.patchValue({product_sub_id : ""})
      if(this.productType2 != null){
        this.productTypeLoad =this.productType2.filter(x=>x.product_type_id == id);
      }
   
  }

  GetProductType(){
   
      this.utils.StartSpinner();
        this.context.getWithToken('','product/getallproductstype').
        subscribe( data => {
          let d = <any>data;
          this.productType = d.data;
          this.productType2 = d.data2;
          console.log(d)
          this.utils.StopSpinner();
        }); 
    
  }



}
