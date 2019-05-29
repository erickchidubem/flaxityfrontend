import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
declare var $:any;

@Component({
  selector: 'app-create-contract-details',
  templateUrl: './create-contract-details.component.html',
  styleUrls: ['./create-contract-details.component.css']
})
export class CreateContractDetailsComponent implements OnInit {
  @Input() accountId : any;
  @Input() contractId : any;
  constructor(private fb : FormBuilder, private toaster : ToasterService,
    private context : ContextService,public utils : Utils) { }

  get f() {return this.form.controls;}
  form : FormGroup;
  submitted : boolean = false;
  
  ngOnInit() {
    this.setUp();
    this.submitted = false;
    this.getAccountMachine(this.accountId);
    this.generateForm();

  }

  machine : any= [];
  contractDetails : any = [];
  contractData :any =[];
  setUp(){
    this.context.getWithToken(this.accountId,'/machine/getaccountmachine/').
    subscribe( data => {
      let d = <any>data; 
      console.log(d)
      this.machine = d.data;
      // this.utils.StopSpinner();
    });

    this.context.getWithToken(this.contractId,'/billing/contractbillingdetails/').
    subscribe( data => {
      let d = <any>data; 
      console.log(d)
      this.contractData = d;
      this.contractDetails = d.data;
     // this.utils.StopSpinner();
    });
  }

  account_machine : any=[];
  getAccountMachine(accountid){
    if(this.machine != null){
      this.account_machine =this.machine.filter(x=>x.accountid == accountid);
    }
    
  }


  generateForm(){

    this.form = this.fb.group({
      id : [0],
      accountId : [this.accountId],
      contract_id : [this.contractId],
      machine_id : ['', [Validators.required]], 
      rentalCharge : ['', [Validators.required]],
      min_vol_mono : ['', [Validators.required]], 
      cost_mono : ['', [Validators.required]],
      excess_mono : ['', [Validators.required]], 
      excess_cost_mono  : ['', [Validators.required]], 
      min_vol_color : ['', [Validators.required]], 
      cost_color : ['', [Validators.required]], 
      excess_color : ['', [Validators.required]], 
      excess_cost_color : ['', [Validators.required]], 
      initial_mono : ['', [Validators.required]], 
      initial_color : ['', [Validators.required]], 
      // current_mono : ['', [Validators.required]], 
      // current_color : ['', [Validators.required]]
    });
  }

  generate(){
    this.form.reset();
    this.form.patchValue({
      id : 0,
      accountId : this.accountId,
      contract_id : this.contractId,
      
    })
  }

  editForm(d : any){
    console.log(d);
    this.form.reset();
    this.form.patchValue({
      id : d.id,
      accountId : this.accountId,
      contract_id : this.contractId,
      machine_id : d.machine_id ,
      rentalCharge : d.rentalCharge ,
      min_vol_mono : d.min_vol_mono ,
      cost_mono : d.cost_mono ,
      excess_mono : d.excess_mono ,
      excess_cost_mono  : d.excess_cost_color ,
      min_vol_color : d.min_vol_color ,
      cost_color : d.cost_color ,
      excess_color : d.excess_color ,
      excess_cost_color : d.excess_cost_color ,
      initial_mono : d.initial_mono ,
      initial_color : d.initial_color ,
    });
    console.log(this.form.value)
  }

  resetForm(){
    this.submitted = false;
    this.form.reset();
  }



 
  submit(){
    this.submitted = true;
    let formData = JSON.stringify(this.form.value);
    console.log(formData)
    if(this.form.invalid){
      this.utils.invalidFormMessage();
      return;
    }

    this.utils.StartSpinner();
    
    this.context.postWithToken(formData, 'billing/createeditcontractdetails').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
           this.toaster.Success(d.message);
            console.log(d);
        
            this.toaster.Success(d.message);
            $('#leadcontact').modal("hide");
            this.ngOnInit();
              
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

}
