import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generate-billing',
  templateUrl: './generate-billing.component.html',
  styleUrls: ['./generate-billing.component.css']
})
export class GenerateBillingComponent implements OnInit {

  constructor(private fb : FormBuilder, private toaster : ToasterService,
    private route : ActivatedRoute,
    private context : ContextService,public utils : Utils) { }

  id : any;
  contractDetails : any = [];
  contractData : any = [];
  serviceInfo : any;
  editCreateHeader : any;
  loadForm : boolean = false;
  ngOnInit() {
    this.loadForm = false;
    this.id = this.route.params['value'].id;
    this.generateForm(this.id)
    this.getSetUp();

  }


  form : FormGroup;
  submitted : boolean = false;

  get f(){return this.form.controls;}


  generateForm(contractId){

    this.form = this.fb.group({
      id : 0,
      contractId : [contractId],
      fromDate : ['', [Validators.required]],
      toDate : ['', [Validators.required]],
      billingDetails : this.fb.array([])
    });
  }

  populateFormArray(item){
    console.log(item)
    const creds = this.form.controls.billingDetails as FormArray;

    if(item != null){
      this.loadForm = true;
        creds.push(this.fb.group({
          contract_id : this.id,
          contract_details_id : [item.id],
          machine_id : [item.machine_id],
          account_id : item.accountId,
          rentalCharge : item.rentalCharge,
          total_mono : ['', [Validators.required, Validators.min(item.current_mono)]],
          total_color : ['', [Validators.required,Validators.min(item.current_color)]],
          previous_mono : item.current_mono,
          previous_color : item.current_color,
          amountMono : ['', [Validators.required]],
          amountColor : ['',[Validators.required]],
          count_mono : ['',[Validators.required]],
          count_color : ['', [Validators.required]]
        }));

    }
  }


  processBIllingInformation(formData){
    this.utils.StartSpinner();
    this.context.postWithToken(formData, 'billing/generatebilling').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == true){
          this.toaster.Error(d.message);
        
          // if(this.id > 0){
          //     this.router.navigate(['/access/lead/view-lead/'+this.id])
          //   }else{
          //     this.router.navigate(['/access/lead/view-my-lead']);
          //   }
          
        }else{
          this.toaster.Success(d.message)
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

  formData : any = [];
  submit(){
    this.submitted = true;
    if(this.form.invalid){
      this.utils.invalidFormMessage();
      return;
    }
    this.formData = JSON.stringify(this.form.value);
    console.log(this.formData)


    this.processBIllingInformation(this.formData)
    
  }

  get h(){ 
    var arrayControl = this.form.get('billingDetails') as FormArray;
    return arrayControl.controls;
  }

  calculateTotalMonoCount(i){
    var arrayControl = this.form.get('billingDetails') as FormArray;
    let p_mono = document.getElementById("p_mono"+i)["value"];
    let c_mono = document.getElementById("t_mono"+i)["value"];
    let totalPage = +c_mono - +p_mono;
    document.getElementById("t_mono_count"+i)["value"] = totalPage;
    arrayControl.controls[i].get('count_mono').setValue(totalPage);
   

    let costperclickmono =  document.getElementById("cost_mono"+i)["value"];
    let minvolmono =  document.getElementById("min_vol_mono"+i)["value"];
    let excessmono = document.getElementById("excess_mono"+i)["value"];
    let excessmonocost = document.getElementById("excess_cost_mono"+i)["value"];

    let amountmono = +costperclickmono * +minvolmono;
    amountmono = Math.round(amountmono*100)/100;

    let amountmono2 = +costperclickmono * +totalPage;
    amountmono2 = Math.round(amountmono2*100)/100;

    if(+minvolmono >= totalPage){
      document.getElementById("amount_mono"+i)["value"] = amountmono; 
      arrayControl.controls[i].get('amountMono').setValue(amountmono);
    }else if(totalPage > minvolmono && totalPage > excessmono){
         
          let spillOver = totalPage - +excessmono;
          let spillOverCost = spillOver * +excessmonocost;
          let finalCost = amountmono + spillOverCost;
          finalCost = Math.round(finalCost*100)/100;

          document.getElementById("amount_mono"+i)["value"] = finalCost; 
          arrayControl.controls[i].get('amountMono').setValue(finalCost);

    }else{
      document.getElementById("amount_mono"+i)["value"] = amountmono2; 
      arrayControl.controls[i].get('amountMono').setValue(amountmono2);
    }

  }

  calculateTotalColorCount(i){
   
    var arrayControl = this.form.get('billingDetails') as FormArray;

   let p_color = document.getElementById("p_color"+i)["value"];
    let c_color = document.getElementById("t_color"+i)["value"];
    let totalPage = +c_color - +p_color;
    document.getElementById("t_color_count"+i)["value"] = totalPage;
    arrayControl.controls[i].get('count_color').setValue(totalPage);

    let costperclickcolor =  document.getElementById("cost_color"+i)["value"];
    let minvolcolor =  document.getElementById("min_vol_color"+i)["value"];
    let excesscolor = document.getElementById("excess_color"+i)["value"];
    let excesscolorcost = document.getElementById("excess_cost_color"+i)["value"];


    let amountcolor = +costperclickcolor * +minvolcolor;
    amountcolor = Math.round(amountcolor*100)/100;

    
    let amountcolor2 = +costperclickcolor * +totalPage;
    amountcolor2 = Math.round(amountcolor2*100)/100;


    if(+minvolcolor >= totalPage){
      
      document.getElementById("amount_color"+i)["value"] = amountcolor; 
      arrayControl.controls[i].get('amountColor').setValue(amountcolor);
      
    }else if(totalPage > minvolcolor){
         
          let spillOver = totalPage - +excesscolor;
          let spillOverCost = spillOver * +excesscolorcost;
          let finalCost = amountcolor + spillOverCost;
          finalCost = Math.round(finalCost*100)/100;
          document.getElementById("amount_color"+i)["value"] = finalCost; 
          arrayControl.controls[i].get('amountColor').setValue(finalCost);
          
    }else{
      document.getElementById("amount_mono"+i)["value"] = amountcolor2; 
      arrayControl.controls[i].get('amountMono').setValue(amountcolor2);
    }
   
    
  }


  getSetUp(){
    this.context.getWithToken(this.id,'/billing/contractbillingdetails/').
    subscribe( data => {
      let d = <any>data; 
      console.log(d)
      this.contractData = d;
      this.contractDetails = d.data;
      //this.contractDetails.foreach(this.populateFormArray);
      for(var i = 0; i < this.contractDetails.length; i++){
        this.populateFormArray(this.contractDetails[i]);

      }
    
     // this.utils.StopSpinner();
    });

  this.context.getWithToken(this.id+'/0','billing/getcontractinfo/').
  subscribe( data => {
    let d = <any>data;
    this.editCreateHeader = "Generate Billing Information for Contract Id :  "+d.data.contractid+ " FOR "+d.data.accountName;
    this.serviceInfo = d.data;
    this.utils.StopSpinner();
  
  }); 
  }

}
