import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb : FormBuilder, private context : ContextService,private toaster : ToasterService,
    public utils : Utils, private router : Router) { }

    submitted = false;

  ngOnInit() {
    this.submitted = false;
    this.generateForm();
  }

  form : FormGroup;
  generateForm(){
    this.form = this.fb.group({    
      email : ['', [Validators.required,Validators.email]],
    });
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){
      this.toaster.Error("Enter Email Properly")
      return;
    }

  this.utils.StartSpinner();
  let formData = JSON.stringify(this.form.value);
  console.log(formData);
  this.context.postWithNoToken(formData, 'user/passwordresetlink').subscribe(
    data=>{
      this.utils.StopSpinner();
      let d = <any>data;
      if(d.error == false){
       // this.toaster.Success(d.message);  
        this.toaster.Success("Please Login to your email and click on the link to reset your password") ;
       
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

get f(){return this.form.controls;}

}
