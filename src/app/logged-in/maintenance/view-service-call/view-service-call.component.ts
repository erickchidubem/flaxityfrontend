import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
declare var $:any;
@Component({
  selector: 'app-view-service-call',
  templateUrl: './view-service-call.component.html',
  styleUrls: ['./view-service-call.component.css']
})
export class ViewServiceCallComponent implements OnInit {

  constructor(public utils : Utils,private context : ContextService,
    private toaster : ToasterService,
    private route: ActivatedRoute,private fb : FormBuilder) { }

  serviceInfo : any=[];
  followUp : any[];
  id : any = this.route.params['value'].id;
  engineers : any[];
  machinecase : any[];
 
  ngOnInit() {
    this.getLeadInformation(this.id);
    this.generateForms(this.id);
  }

  getLeadInformation(id){
    this.utils.StartSpinner();
      this.context.getWithToken(id,'maintenance/getsingleservicecall/').
      subscribe( data => {
        let d = <any>data;
        this.serviceInfo = d.data1;
        this.followUp = d.data2;
        console.log(d)
        this.utils.StopSpinner();
      }); 

      this.context.getWithToken('','maintenance/getmaintenancesetup').
      subscribe( data => {
        let d = <any>data;
        this.engineers = d.data3;
        //this.machineIssue = d.data2;
      //  this.optionalizeIssues(d.data2);
        this.machinecase = d.data1;
        this.utils.StopSpinner();
      }); 
  }


  get f1() {return this.reschedule.controls;}
  get f2() {return this.followup.controls;}
  get f3() {return this.closed.controls;}
 
  f1submit:boolean=false;reschedule : FormGroup;//f1;
  f2submit:boolean=false;followup : FormGroup;//f2;
  f3submit:boolean=false ; closed : FormGroup;//f3;

  generateForms(id){
    
    this.followup = this.fb.group({      
      id : [0],
      servicecall_id : [id],
      scheduledTime : ['',Validators.required],
      StartTime : ['',Validators.required],
      FinishedTime : ['',Validators.required],
      observations : ['',Validators.required],
      workdone : ['',Validators.required],
      recommendation : ['',Validators.required]
    });
  
    this.reschedule = this.fb.group({
      servicecall_id : [id],
      engineer_id : ['',Validators.required],
      scheduledDate : ['',Validators.required]      
    });

    this.closed = this.fb.group({
      servicecall_id : [id],
      closeStatus : ['',Validators.required],
      paymentstatus_id : ['',Validators.required],
      closeNote : ['', Validators.required]
    });
  }

  submitReschedule(){
    this.f1submit = true;
    console.log(this.reschedule.value);
    if(this.reschedule.invalid){
      this.utils.invalidFormMessage();
      return;
    }

      this.utils.StartSpinner();
       let formData = JSON.stringify(this.reschedule.value);
       console.log(formData);
      this.context.postWithToken(formData, '/maintenance/rescheduleengineer').subscribe(
        data=>{
          this.utils.StopSpinner();
          let d = <any>data;
          if(d.error == false){
            this.utils.StopSpinner();
            this.toaster.Success(d.message);
            $('#reschedule').modal("hide");
              this.ngOnInit();              
          }else{
            this.utils.StopSpinner();
            this.toaster.Error(d.message);
          }
          console.log(d);
        },
      );
  }
  

  submitClosed(){
    this.f3submit = true;
    console.log(this.closed.value);
    if(this.closed.invalid){
      this.utils.invalidFormMessage();
      return;
    }

      // this.utils.StartSpinner();
       let formData = JSON.stringify(this.closed.value);
       console.log(formData);
      this.context.postWithToken(formData, '/maintenance/closecall').subscribe(
        data=>{
          this.utils.StopSpinner();
          let d = <any>data;
          if(d.error == false){
            this.toaster.Success(d.message);
            $('#closed').modal("hide");
              this.ngOnInit();    
                     
          }else{
            this.toaster.Error(d.message);
          }
          console.log(d);
        },
      );
  }

  
}
