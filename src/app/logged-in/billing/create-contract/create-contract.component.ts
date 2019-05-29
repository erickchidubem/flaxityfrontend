import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {

  constructor(private fb : FormBuilder,public utils : Utils,  private route: ActivatedRoute,
    private toaster : ToasterService,private router : Router,
     private context : ContextService) { }

  editCreateHeader : string;
  id : any ;
  id2 : any;
  accountId : any;

  firstLand : boolean = false;
  ngOnInit() {
    if(this.id2 == "view"){

    }

   
    this.firstLand = false;
    
    this.editCreateHeader = "Create New Billing Contract";
    this.generateForm();
    this.getSetUpPage();
    this.getEdit();

  }

  form : FormGroup;

  generateForm(){
    this.form = this.fb.group({
      id : [0],
      accountId : ['',Validators.required],
      contract_type : ['',Validators.required],
      contractDuration : ['',Validators.required],
      contractStartDate : ['',Validators.required],
      billingType : ['',Validators.required],
    });
  }

  get f() {return this.form.controls;}

 

  submitted : boolean = false;
  displayContractDetails : boolean = false;
  Register(){
    //window.history.replaceState({},'',`/person/${1}/${3}`)
    this.submitted = true;
    if(this.form.invalid){
      this.utils.invalidFormMessage();
      return;
    }

    this.utils.StartSpinner();
    let formData = JSON.stringify(this.form.value);
    console.log(formData)
    this.context.postWithToken(formData, 'billing/createeditcontract').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
           this.toaster.Success(d.message);
        console.log(d);
           this.id = d.id;
           this.accountId = this.form.get('accountId').value;
           if(this.id > 0){
             
          //    window.history.replaceState({},'',`/person/${1}/${3}`)
              window.history.replaceState({},"Contract Modification","access/billing/edit-contract/"+this.id)
               this.displayContractDetails = true;
               this.firstLand = true;
             
               
            }else{
             // this.router.navigate(['/access/lead/view-my-lead']);
            }
          
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


  account : any=[];
  billing : any=[];
  billingType : any[];
  billingDuration : any[];
  getSetUpPage(){

    this.context.getWithToken('','account/viewallaccounts').
      subscribe( data => {
        let d = <any>data;
        this.account = d.data;
        this.utils.StopSpinner();
      }); 

      
    this.context.getWithToken('','billing/contractbilling').
    subscribe( data => {
      let d = <any>data;
      this.billing = d.data1;
      this.billingType = d.data2;
      this.utils.StopSpinner();
      console.log(d)
    }); 
    
  }


  editData

  serviceInfo : any;

 

 populateForm(d:any){
   this.form.patchValue({
    id : d.id,
    accountId : d.accountId,
    contract_type : d.contract_type,
    contractDuration : d.contractDuration,
    contractStartDate : d.contractStartDate,
    billingType : d.billingType,

   });
 }

  getEdit(){
    
    this.submitted = false;
    this.id = this.route.params['value'].id;
    if(this.id > 0){
     
      this.context.getWithToken(this.id,'billing/getcontractinfo/').
      subscribe( data => {
        let d = <any>data;
        console.log(d)
        this.editCreateHeader = "Edit CONTRACT INFO "+d.data.contractid+ " FOR "+d.data.accountName;
        this.serviceInfo = d.data;
        this.populateForm(d.data);
   
        this.utils.StopSpinner();
        this.firstLand = true;
        this.displayContractDetails = true;
        this.accountId = d.data.accountId;
        console.log(d)
      }); 
    }
    
  }

}
 