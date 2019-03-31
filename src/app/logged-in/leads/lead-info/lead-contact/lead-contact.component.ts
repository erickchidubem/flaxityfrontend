import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Utils } from 'src/app/shared/shared-service/utils';
declare var $:any;

@Component({
  selector: 'app-lead-contact',
  templateUrl: './lead-contact.component.html',
  styleUrls: ['./lead-contact.component.css']
})
export class LeadContactComponent implements OnInit {
  @Input() accountId : any;
  @Input() machineId : any;
  constructor(private fb : FormBuilder,private context : ContextService,
    private route: ActivatedRoute, private toaster : ToasterService,public utils : Utils) {
     
     }

  id : any;
  machineid : any;
 
  ngOnInit() {  
    this.id = this.accountId; 
    this.machineid = this.machineId;
    this.generateForm(this.id);
    this.getLeadContacts(this.id);
  }
 

  leadContacts : any;
  getLeadContacts(id){
      this.context.getWithToken(id,'account/accountcontact/').
      subscribe( data => {
        let d = <any>data;
        this.leadContacts = d.data;
        console.log(d)
       
      }); 
  }
  
 
  form : FormGroup;
  generateForm(acc_id){
    this.form = this.fb.group({
      id : [0],
      accountId : [acc_id],
      machineId : [this.machineId,Validators.required],
      contactPerson : ['',Validators.required],
      phone : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      designation : ['',Validators.required],
    });
  }

  get f () {return this.form.controls;}


  generate(){
   
   this.form.patchValue({id : 0,contactPerson : "", phone : "" , email : "", designation : ""})
  }

  EditContact(id,contactPerson,phone,email,designation,machineId=0){
    this.form.patchValue({id:id,contactPerson:contactPerson,phone:phone,email:email,designation:designation,machineId:machineId})
  }
  

 submitted : boolean = false;

  resetForm(){
    this.submitted = false;
   
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
    this.context.postWithToken(formData, 'account/createeditcontact').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.Success(d.message);
          $('#leadcontact').modal("hide");
          this.ngOnInit();
        }
        console.log(data);
      }
    );
  }




}
