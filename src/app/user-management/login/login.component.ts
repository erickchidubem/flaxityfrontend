import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  constructor(private fb : FormBuilder,public utils : Utils,private _context : ContextService,
    private toaster : ToasterService, private router : Router,
    ) { }

  submitted : boolean = false;
  ngOnInit() {
    this.submitted = false;
    this.generateForm();
  }

  get f(){return this.form.controls;}
  

  generateForm(){
    this.form = this.fb.group({
    
      email : ["", [Validators.required,Validators.email]],
      password : ["", [Validators.required]],
      
    });
  }
  

  Login(){

    this.submitted = true;
    if(this.form.invalid){return;}

    this.utils.StartSpinner();
  
    let formData = JSON.stringify(this.form.value);
    this._context.postWithNoToken(formData,'user/internaluserlogin').
                    subscribe((response:Response)=>{ 
                              this.utils.StopSpinner();                        
                              let data = <any>response;
                              console.log(data)
                              if(data.error){
                               
                                this.toaster.Error(data.message)
                              
                              }else{
                                this.router.navigate(['access/dashboard'])
                                localStorage.setItem('token',data.user.token);
                                this.toaster.Success(data.message);
                              }
                                 
                    },
                    err => {
                                this.utils.StopSpinner();                              
                                console.log('Error Message : '+err.message);
                                console.log('Error : '+err.status);
                                console.log (err.error)
                                this.toaster.Error(err.error)
                               
                    }
                  );               
       }
  }
