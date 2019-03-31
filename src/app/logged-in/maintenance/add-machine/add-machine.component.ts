import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {

  constructor(private fb : FormBuilder,public utils : Utils,private context : ContextService,
    private route: ActivatedRoute,private location : Location,
    private toaster : ToasterService, private router : Router) { }
 
   

    editCreateHeader : string ;

    selected: any;
    data: Array<any>;
    options: any = {
      multiple: true
    };

  //  this.selected = [{ text: 'FeMale', id: 'ca22406c-350a-49e5-b0db-2714b164c560' }];

  ngOnInit() {
    this.editCreateHeader = "Create New Machine";
    this.submitted = false;
    this.id = this.route.params['value'].id;
    this.getEditInformation(this.id);
    this.generateForm();
  
    this.getAllAccount();
    this.getAllMachine();
    
  }
  
  account :any;
  product : any;
  submitted : boolean =false;
  id : any;

  upDateFormInformation(d : any){
    this.form.patchValue({
      id : d.id,
      account_id : d.account_id,
      product_id : d.product_id,
      serialNo : d.serialNo,
      code : d.code
    });
  }


  goBack(){
      this.location.back();
  }


  getEditInformation(id){   
    if(id > 0){
      this.utils.StartSpinner();
      this.context.getWithToken(id,'machine/getmachine/').
      subscribe( data => {
        let d = <any>data;
        this.editCreateHeader= "Edit Machine  for "+d.data.name+" with serialNo : "+d.data.serialNo+" and product : "+d.data.productName;
        this.upDateFormInformation(d.data);
        console.log(d.data)
        this.utils.StopSpinner();
      });    
    }else{
      this.editCreateHeader = "Create New Machine";
    }

  }

  get f() {return this.form.controls;}

 
  form : FormGroup;
  generateForm(){
    this.form = this.fb.group({
      id : [0],
      account_id : ['',Validators.required],
      product_id : ['',Validators.required],
      serialNo : ['',Validators.required],
      code : ['',Validators.required],
    });
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

    this.context.postWithToken(formData, 'machine/createeditmachine').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.Success(d.message);
          //access/maintenance/machine-info/2
          this.router.navigate(['/access/maintenance/machine-info/'+d.id]);                
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


  getAllMachine(){

    this.utils.StartSpinner();
      this.context.getWithToken('1','product/getproductsbytype/').
      subscribe( data => {
        let d = <any>data;
        this.product = d.data;
      //  this.convertproduct(d.data);
        console.log(d)
        this.utils.StopSpinner();
      }); 
  }

  convertproduct(d : any){
    for(let c of d){  
      this.product.push({id : c.id, text : c.productName});
    }
  }

  getAllAccount(){

    this.utils.StartSpinner();
      this.context.getWithToken('','account/viewallaccounts').
      subscribe( data => {
        let d = <any>data;
        this.account = d.data;
        console.log(d)
        this.utils.StopSpinner();
      }); 
  }
}
