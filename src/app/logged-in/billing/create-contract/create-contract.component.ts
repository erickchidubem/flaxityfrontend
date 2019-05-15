import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {

  constructor(private fb : FormBuilder,public utils : Utils,
    private toaster : ToasterService,private router : Router,
     private context : ContextService) { }

  ngOnInit() {
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
  Register(){
    //window.history.replaceState({},'',`/person/${1}/${3}`)
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.invalid){
      this.utils.invalidFormMessage();
      return;
    }

    this.utils.StartSpinner();
    let formData = JSON.stringify(this.form.value);

    this.context.postWithToken(formData, 'account/createeditaccount').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          // this.toaster.Success(d.message);
        
          // if(this.id > 0){
          //     this.router.navigate(['/access/lead/view-lead/'+this.id])
          //   }else{
          //     this.router.navigate(['/access/lead/view-my-lead']);
          //   }
          
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


  getLeadSource(){

    this.utils.StartSpinner();
      this.context.getWithToken('','account/leadsource').
      subscribe( data => {
        let d = <any>data;
      //  this.LeadSource = d.data;
        console.log(d)
        this.utils.StopSpinner();
      }); 
  }

}
 