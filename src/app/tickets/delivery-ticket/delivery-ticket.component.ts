import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-delivery-ticket',
  templateUrl: './delivery-ticket.component.html',
  styleUrls: ['./delivery-ticket.component.css']
})
export class DeliveryTicketComponent implements OnInit {
  salesInfo : any =[];
  salesDetails : any =[];
  constructor(private fb : FormBuilder,private context : ContextService,public utils : Utils,
    private toaster : ToasterService,private router : Router, private route: ActivatedRoute) { }

  id : string;
  salesid : string;

  delivery1 : any;
  delivery2 : any;


  formcloseorder : FormGroup;
  ngOnInit() {
    this.submitted = false;
    this.id = this.route.params['value'].id;
    this.salesid = this.route.params['value'].salesid;
    this.getSalesInfo(this.id, this.salesid);
   
  }



getSalesInfo(id,salesid){
  this.context.getWithToken(id,'sales/getdeliveryinformation/').
  subscribe( data => {
    let d = <any>data;
    this.delivery1 = d.data1;
    this.delivery2 = d.data2;
    
    console.log(d)
  });

  this.context.getWithToken(salesid,'sales/getsinglesales/').
  subscribe( data => {
    let d = <any>data;
      this.salesInfo = d.data.salesInfo;
      this.salesDetails = d.data.salesdetails;
    console.log(d)
  });
} 


get f() {return this.formcloseorder.controls;}
submitted : boolean = false;
submitcloseorder(){

  this.submitted = true;
  if(this.formcloseorder.invalid){
    this.toaster.Error("Please enter date order was closed")
    return;
  }

  let formData = JSON.stringify(this.formcloseorder.value);

  console.log(formData);
    this.context.postWithToken(formData, 'sales/closeorder').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        console.log(d);
        if(d.error == false){
          $('#closeorder').modal("hide");
          this.toaster.Success(d.message);
          this.ngOnInit();
        }else{
          this.toaster.Error(d.message);
        }
        console.log(data);
      }
    );
}
 
}
