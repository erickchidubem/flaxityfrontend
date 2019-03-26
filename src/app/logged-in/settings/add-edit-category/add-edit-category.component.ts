import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ActivatedRoute } from '@angular/router';
import { CdkTableService } from 'src/app/shared/shared-service/cdk-table';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {

  constructor(private context : ContextService,public utils : Utils, private route : ActivatedRoute,
    private toaster : ToastrService,private cdktable : CdkTableService, private fb : FormBuilder ) { }

  form : FormGroup;
  form2 : FormGroup;

  submitted : boolean = false;
  submitted2 : boolean = false;

  createNewCategory : boolean = false;
  createNewSubCategory : boolean = false;

  ngOnInit() {
    this.submitted = false;
    this.submitted2 = false;
    this.createNewCategory = false;
    this.createNewSubCategory = false;
    this.generateForm();
  }


  generateForm(){
    this.form = this.fb.group({
      id : ['0'],
      type : ['',Validators.required]
    });

    this.form2 = this.fb.group({
      id : ['0'],
      product_type_id : ['',Validators.required],
      product_sub : ['',Validators.required]
    });

    this.GetProductType();
  }

  get f(){return this.form.controls;}
  get g(){return this.form2.controls;}
 
  registerCategory(){
    this.submitted = true;
    if(this.form.invalid){
      this.utils.invalidFormMessage();
      return;
    }
    this.utils.StartSpinner();
    let formData = JSON.stringify(this.form.value);

    this.context.postWithToken(formData, 'product/createeditproducttype').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.success(d.message);
          this.ngOnInit();
        }else{
          this.toaster.error(d.message);
        }
        console.log(data);
      }     
    );
  }

  registerSubCategory(){
    this.submitted2 = true;
    if(this.form2.invalid){
      this.utils.invalidFormMessage();
      return;
    }
    this.utils.StartSpinner();
    let formData = JSON.stringify(this.form2.value);
    this.context.postWithToken(formData, 'product/createeditproducttypesub').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.success(d.message);
          this.ngOnInit();
        }else{
          this.toaster.error(d.message);
        }
        console.log(data);
      }     
    );
  }


  AddCategory(){
    this.form.reset();
    this.createNewCategory = true;
    this.form.patchValue({id:0});
  }

  AddSubCategory(){
    this.form.reset();
    this.createNewSubCategory = true;
    this.form2.patchValue({id:0});
  }

  EditCategory(id,name){
    this.createNewCategory =true;
      this.form.patchValue({id:id,type:name});
  }

  EditSubcategory(id,categoryId,sub){
    this.createNewSubCategory = true;
    this.form2.patchValue({id : id,product_type_id:categoryId,product_sub:sub});
  }


  productType : any=[];
  productType2 : any=[];
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
