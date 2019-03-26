import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {PasswordValidator} from '../../../shared/shared-service/Validator';
import { utils } from 'protractor';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form : FormGroup;
  submitted : boolean = false;
  constructor(private fb : FormBuilder,public utils : Utils,private context : ContextService,
    private toaster : ToasterService, private router : Router) { }

  ngOnInit() {
    this.submitted = false;
    this.generateForm();
  }
 
  Submit(){
      this.submitted = true;
      if(this.form.invalid){
        
        this.toaster.Error("some fields are missing");
        return;
      }

    this.utils.StartSpinner();
    let formData = JSON.stringify(this.form.value);

    this.context.postWithToken(formData, 'user/changepassword').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.Success(d.message);  
          this.toaster.Success("Please Login with your new password") ;
          localStorage.removeItem('token'); 
          this.router.navigate(['/']);
         // this.utils.Logout();

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

 generateForm(){
    this.form = this.fb.group({  
      id : [0],
      oldPassword : ['',Validators.required],
      newPassword : ['',[
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]
  ],
  newPassword2 : ['',[PasswordValidator,Validators.required]]
});

this.form.controls.newPassword.valueChanges.subscribe(
x=> this.form.controls.newPassword2.updateValueAndValidity()
);

}

}
