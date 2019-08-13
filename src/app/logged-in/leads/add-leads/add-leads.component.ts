import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrls: ['./add-leads.component.css']
})
export class AddLeadsComponent implements OnInit {

  constructor(private fb : FormBuilder,public utils : Utils,private context : ContextService,
    private route: ActivatedRoute,
    private toaster : ToasterService, private router : Router) { }
 
    Industry :any;
    Users : any;
    UsersSales : any;
    LeadSource : any;
    SalesStage : any;
    submitted : boolean =false;
    id : any;

    editCreateHeader : string ;

  ngOnInit() {
    this.submitted = false;
    this.id = this.route.params['value'].id;
    this.getEditInformation(this.id);
    this.generateForm();
    this.getIndustry();
    this.getLeadSource();
    this.getSalesStages();
    this.getAllInternalUsers();
    
  }


  upDateFormInformation(d : any){
    this.form.patchValue({
      id : d.id,
      industryId :d.industryId,
      name : d.name,
      phone : d.phone,
      sales_Assign : d.sales_Assign,
      service_Assign : d.service_Assign,
      account : d.account,
      currentSalesStage : d.currentSalesStage,
      email : d.email,
      address : d.address,
      leadSource : d.leadSource
    });
  }



  getEditInformation(id){
    
    if(id > 0){
      this.utils.StartSpinner();
      this.context.getWithToken(id,'account/viewleadinfo/').
      subscribe( data => {
        let d = <any>data;
        this.editCreateHeader= "Edit "+d.data.name;
        this.upDateFormInformation(d.data);
        console.log(d.data)
        this.utils.StopSpinner();
      });
        
    }else{
      this.editCreateHeader = "Create New Lead";
    }

  }

  get f() {return this.form.controls;}

 
  form : FormGroup;
  generateForm(){
    this.form = this.fb.group({
      id : [0],
      industryId : ['',Validators.required],
      name : ['',Validators.required],
      phone : ['',Validators.required],
      sales_Assign : ['',Validators.required],
      service_Assign : ['',Validators.required],
      account : ['',Validators.required],
      currentSalesStage : ['',Validators.required],
      email : ['', [Validators.required,Validators.email]],
      address : ['',Validators.required],
      leadSource : ['',Validators.required]
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

    this.context.postWithToken(formData, 'account/createeditaccount').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.Success(d.message);
        
          if(this.id > 0){
              this.router.navigate(['/access/lead/view-lead/'+this.id])
            }else{
              this.router.navigate(['/access/lead/view-my-lead']);
            }
          
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
        this.LeadSource = d.data;
        console.log(d)
        this.utils.StopSpinner();
      }); 
  }

  getIndustry(){
    this.utils.StartSpinner();
      this.context.getWithToken('','account/industry').
      subscribe( data => {
        let d = <any>data;
        this.Industry = d.data;
        console.log(d)
        this.utils.StopSpinner();
      }); 
  } 

  getSalesStages(){
    this.utils.StartSpinner();
      this.context.getWithToken('','account/salesstage').
      subscribe( data => {
        let d = <any>data;
        this.SalesStage = d.data;
        console.log(d)
        this.utils.StopSpinner();
      }); 
  }


  getAllInternalUsers(){
    this.utils.StartSpinner();
      this.context.getWithToken('','user/getallinternaluser').
      subscribe( data => {
        let d = <any>data;
        this.Users = d.data;
        if(this.context.UserProfile().roleId == 1)
        {
          this.UsersSales = d.data;
        }else{
          this.UsersSales = d.data.filter(x=>x.id == this.context.UserProfile().id);
        }
        console.log(d)
        this.utils.StopSpinner();
      }); 
  }

  //

}
