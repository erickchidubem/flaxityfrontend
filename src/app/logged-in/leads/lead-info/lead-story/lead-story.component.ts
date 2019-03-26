import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
declare var $:any;
@Component({
  selector: 'app-lead-story',
  templateUrl: './lead-story.component.html',
  styleUrls: ['./lead-story.component.css']
})
export class LeadStoryComponent implements OnInit {

  constructor(public utils : Utils,private context : ContextService, private fb : FormBuilder,
    private route: ActivatedRoute, private toaster : ToasterService) { }

  id : any;
  leadStoryInfo : any;
  SalesStage : any;
  submitted : boolean = false;
  my_userId : any;


  ngOnInit() {
    this.submitted = false;
    this.id = this.route.params['value'].id;
    this.generateForm(this.id);
    this.getUserInformation();
    this.getSalesStages();
    this.getLeadStoryInformation(this.id);
  }

  getUserInformation(){
    //this.utils.StartSpinner();
      this.context.postWithToken('','user/getinternaluser').
      subscribe( data => {
      
       let d = <any>data; 
       this.my_userId = d.user.id;
       console.log(d.user)
       
      }); 
  }

  getLeadStoryInformation(id){
    this.utils.StartSpinner();
      this.context.getWithToken(id,'account/viewleadsstories/').
      subscribe( data => {
        let d = <any>data;
        this.leadStoryInfo = d.data;
        console.log(d.data)
        this.utils.StopSpinner();
      }); 
  }

  getSalesStages(){
   
      this.context.getWithToken('','account/salesstage').
      subscribe( data => {
        let d = <any>data;
        this.SalesStage = d.data;
        console.log(d)
       
      }); 
  }
  
  
  storyInformation : any;
  formShow : boolean = false;
  form : FormGroup;

  generateForm(acc_id){
    this.form = this.fb.group({
      id : [0],
      account_id : [acc_id],
      salesstage : ['',Validators.required],
      proposedRevisitDate : ['',Validators.required],
      firstDescription : ['',Validators.required]
    });
  }

  get f () {return this.form.controls;}


  generate(){
    this.formShow = true;
    this.storyInformation = "";
  }

  generateStoryInfo(d : any){

    
    this.storyInformation = "<b>"+d.name+"</b>";
    this.storyInformation += "<p><b> Email : </b>"+d.email+"  <b>Phone : </b>"+d.phone+"</p>";
    this.storyInformation += "<b> Prepared By : </b>"+d.admin_name+"";
    this.storyInformation += "<p><b> Initial Sales Stage : </b>"+d.initial_salesstage+" - "+d.initialSalesStage+"% <b>Created Date : </b>"+d.createdDate+"</p>";
    this.storyInformation += "<p><b> Description : </b>"+d.firstDescription+"</p>";
    this.storyInformation += "<p><b> Proposed Revisit Date : </b> "+d.proposedRevisitDate+"</p>";
  
    if(d.revisit == 1){
      
      this.formShow = false;     
      this.storyInformation += "<p><b> After Visit Sales Stage : </b>"+d.revist_salesstage+" - "+d.revisitSalesStage+"% <b>Revisit Form Filled on : </b>"+d.revistUpdateDate+"</p>";
      this.storyInformation += "<p><b> Follow Up Information : </b>"+d.revisitDescription+"</p>";
      this.storyInformation += "<p><b> Claimed Revisit Date : </b> "+d.claimedRevisitDate+"</p>";
   
    }

    this.form.patchValue({id : d.id});
  
    if(d.revisit == 1){
      this.formShow == false;
    } else if(d.revisit == 0 && d.requiredTimeToUpdate > 72){
      this.formShow == false;
    }else if(this.my_userId  != d.createdBy)
    { 
      this.formShow = false; 
    } else {
      this.formShow = true;
    }

  }



  resetForm(){
    this.submitted = false;
    //this.form.reset();
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){
      this.utils.invalidFormMessage();
      return;
    }

    this.utils.StartSpinner();
    let formData = JSON.stringify(this.form.value);
    console.log(formData);
    this.context.postWithToken(formData, 'account/createeditleadstory').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.Success(d.message);
          $('#leadstory').modal("hide");
          this.getLeadStoryInformation(this.id);
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
 