import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/shared-service/Validator';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  form : FormGroup;
  submitted : boolean = false;
  grant_access : boolean = false;
  email_address = "";
  constructor(public utils : Utils, private router : Router,
    private toaster : ToasterService, private route: ActivatedRoute,
     private context : ContextService, private fb : FormBuilder ) { }

  ngOnInit() {
    this.submitted = false;
    this.generateForm();
    let id = this.route.params['value'].id;
    let date = this.route.params['value'].date;
    let date2 = this.route.params['value'].date2;
    let datediff = this.route.params['value'].datediff;
    this.confirmURL(id,date,date2,datediff);
  }

  generateForm(){
    this.form = this.fb.group({
        id : ['',[Validators.required]],
       
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


  confirmURL(id, date,date2,datediff){
  //  this.utils.StartSpinner();
  //http://localhost:4200/#/password-reset/356a192b7913b04c54574d18c28d46e6395428ab/1551310625/1551311649/128351137a9c47206c4507dcf2e6fbeeca3a9079
  //http://localhost:4200/#/password-reset/356a192b7913b04c54574d18c28d46e6395428ab/1551310625/1551311649/128351137a9c47206c4507dcf2e6fbeeca3a9079
   this.context.getWithNoToken(id+"/"+date+"/"+date2+"/"+datediff,'user/confirmpasswordreset/').
    subscribe( data => {
      let d = <any>data;

      if(d.error == false){
        this.grant_access = true;
        this.email_address = d.data.email;
        this.form.patchValue({
          id : d.data.id
        })

      }else{
        this.toaster.Error("Invalid Reset Password URL")
      }
      
      console.log(d)
      
    // this.utils.StopSpinner();
    }); 
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }

  this.utils.StartSpinner();
  let formData = JSON.stringify(this.form.value);
  console.log(formData);
  this.context.postWithNoToken(formData, 'user/passwordreset').subscribe(
    data=>{
      this.utils.StopSpinner();
      let d = <any>data;
      if(d.error == false){
        this.toaster.Success(d.message);  
        this.toaster.Success("Please Login with your new password") ;
        localStorage.removeItem('token'); 
        this.router.navigate(['/']);
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
