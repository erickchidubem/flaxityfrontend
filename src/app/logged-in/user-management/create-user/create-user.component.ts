import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';

declare var $:any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
 
  submitted : boolean =false;
  id : any;
  editCreateHeader : string;
  department : any =[];
  designation : any=[];
  
  pr_desig : any =[];

  constructor(private fb : FormBuilder,public utils : Utils,private context : ContextService,
    private route: ActivatedRoute,
    private toaster : ToasterService, private router : Router) { }

  ngOnInit() {
   // this.utils.getDateTimePicker('dob');
    this.submitted = false;
    this.id = this.route.params['value'].id;
    this.generateForm();
    this.getDepartments();
    this.getDesignations();
    this.getEditInformation(this.id);
  }


  getDesignation(id){
    console.log(id);
    if(this.designation!= null){
      this.pr_desig =this.designation.filter(x=>x.dptID == id);
    }
    
  }
 
  getDepartments(){

    this.utils.StartSpinner();
      this.context.getWithToken('1','user/getDepartmentDesig/').
      subscribe( data => {
        let d = <any>data;
        this.department = d.data;
        console.log(d)
        this.utils.StopSpinner();
      }); 
  }

  getDesignations(){
    this.utils.StartSpinner();
      this.context.getWithToken('2','user/getDepartmentDesig/').
      subscribe( data => {
        let d = <any>data;
        this.designation = d.data;
        console.log(d)
        this.utils.StopSpinner();
      }); 
  }
  

  form : FormGroup;
  
  generateForm(){
    this.form = this.fb.group({  
      id : [0],
      accountId :[0],
      userType : [1],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      roleId : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      phone : ['', [Validators.required]],
      genderId : ['',Validators.required],
      departmentId : ['',Validators.required],
      designationId : ['',Validators.required],
    });
  }

  updateFormInformation(d : any){
    this.getDesignation(d.departmentId);
    this.form.patchValue({
      id : d.id,
      accountId : 0,
      userType : d.userType,
      firstName : d.firstName,
      lastName : d.lastName,
      roleId : d.roleId,
      email : d.email,
      phone : d.phone,
      genderId : d.genderId,
      departmentId : d.departmentId,
      designationId : d.designationId,
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

    this.context.postWithToken(formData, 'user/createuser').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.Success(d.message);
        
         // if(this.id > 0){
        //      this.router.navigate(['/access/view-lead/'+this.id])
        //    }else{
              this.router.navigate(['/access/users']);
        //    }
          
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

  getEditInformation(id){
    
    if(id > 0){
      this.utils.StartSpinner();
      this.context.getWithToken(id,'user/userInfo/').
      subscribe( data => {
        let d = <any>data;
        this.editCreateHeader= "Edit "+d.data.firstName+"'s Information";
        this.updateFormInformation(d.data);
        this.getDesignation(d.data.departmentId);
        console.log(d.data)
        this.utils.StopSpinner();
      });
        
    }else{
      this.editCreateHeader = "Create New User";
    }

  }

  get f() {return this.form.controls;}

}
