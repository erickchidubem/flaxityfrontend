import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import {Location} from '@angular/common';
import {IOption} from 'ng-select';

@Component({
  selector: 'app-make-service-call',
  templateUrl: './make-service-call.component.html',
  styleUrls: ['./make-service-call.component.css']
})
export class MakeServiceCallComponent implements OnInit {

  constructor(private fb : FormBuilder,public utils : Utils,private context : ContextService,
    private route: ActivatedRoute,private location : Location,
    private toaster : ToasterService, private router : Router) { }
 
   

    editCreateHeader : string ;

    selected: any;
    data: Array<any>;
    options: any = {
      multiple: true
    };

  ngOnInit() {
    this.editCreateHeader = "Create New Service Call";
    this.submitted = false;
    this.id = this.route.params['value'].id;
   
    this.generateForm();
    this.getAllAccount(this.id);  
  }
  
  account :any;
  machine : any;
  account_machine : any;
  product : any;
  submitted : boolean =false;
  id : any;

  upDateFormInformation(d : any){
    this.getAccountMachine(d.account_id);
    this.form.patchValue({
      id : d.id,
      account_id : d.account_id,
      machine_id : d.machine_id,
      reportedBy : d.reportedBy,
      cost : d.cost,
      paymentstatus_id : d.paymentstatus_id,
      case_status_id : d.case_status_id,
      engineer_id : d.engineer_id,
      scheduledDate : this.utils.convertToDateModel(d.scheduledDate),
      reportNote : d.reportNote
    });
  }


  goBack(){
     // this.location
  }


  getEditInformation(id){   
    if(id > 0){
      this.utils.StartSpinner();
      this.context.getWithToken(id,'maintenance/getsingleservicecall/').
      subscribe( data => {
        let d = <any>data;
        this.editCreateHeader= "Edit Service Call  for "+d.data1.name+" with serialNo : "+d.data1.serialNo+" and product : "+d.data1.productName;
        this.upDateFormInformation(d.data1);
        console.log(d)
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
      machine_id : ['',Validators.required],
      reportedBy : ['',Validators.required],
      cost : ['',Validators.required],
      paymentstatus_id : ['', Validators.required],
      case_status_id : ['', Validators.required],
      engineer_id : ['', Validators.required],
      scheduledDate : ['', Validators.required],
      reportNote : ['', Validators.required],
      issues : []

    });
  }

  myOptions: Array<IOption> = [];
 

  Register(){
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.invalid){
      this.utils.invalidFormMessage();
      return;
    }

    this.utils.StartSpinner();
    let formData = JSON.stringify(this.form.value);
    console.log(formData);
    this.context.postWithToken(formData, 'maintenance/createedit').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.Success(d.message);
          //access/maintenance/machine-info/2
          this.router.navigate(['/access/maintenance/view-service-call/'+d.id]);                
        }
        console.log(data);
      },
    );

  }


 

  

  machineIssue : any[];
  machinecase : any[];
  engineers : any[];

  getAllAccount(id){
    this.utils.StartSpinner();
     
    this.context.getWithToken('','account/viewallaccounts').
      subscribe( data => {
        let d = <any>data;
        this.account = d.data;
        this.utils.StopSpinner();
      }); 

      this.context.getWithToken('','machine/getallmachine').
      subscribe( data => {
        let d = <any>data;
        this.machine = d.data;
        this.utils.StopSpinner();
      }); 

      this.context.getWithToken('','maintenance/getmaintenancesetup').
      subscribe( data => {
        let d = <any>data;
        this.engineers = d.data3;
        this.machineIssue = d.data2;
     //   this.optionalizeIssues(d.data2);
        this.machinecase = d.data1;
        this.utils.StopSpinner();
      }); 


    this.getEditInformation(this.id);
    this.utils.StopSpinner();
  }


  optionalizeIssues(d : any){
    console.log(d);
    for(let s of d){
        this.myOptions.push({
          label : s.issues, value : s.id
        })
        
    }
    console.log(this.myOptions)
  }


  getAccountMachine(accountid){
    if(this.machine != null){
      this.account_machine =this.machine.filter(x=>x.accountid == accountid);
    }
    
  }


}
