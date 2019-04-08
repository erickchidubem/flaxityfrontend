import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;

import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  salesInfo : any =[];
  salesDetails : any =[];
  constructor(private fb : FormBuilder,private context : ContextService,public utils : Utils,
    private toaster : ToasterService,private router : Router, private route: ActivatedRoute) { }

  id : string;
  vat : any;
  subTotal : any;
  finalTotal : any;
  userid : any;
  amountDue : any;

  formcloseorder : FormGroup;
  ngOnInit() {
    this.submitted = false;
    this.id = this.route.params['value'].id;
    this.getSalesInfo(this.id);
    this.getUserInformation();
    this.generateForm();
  }


  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 190;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;  
      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight)  
      pdf.save('CISBURO-Invoice.pdf'); // Generated PDF   
    });  
  } 
 
  generateForm(){
    
    this.formcloseorder = this.fb.group({
      id:this.id,
      date : ['',Validators.required],
    
    });


  }
  getUserInformation(){
    //this.utils.StartSpinner();
      this.context.postWithToken('','user/getinternaluser').
      subscribe( data => {
        let d = <any>data;
        this.userid = d.user.id;
       
        
      }); 
  }

getSalesInfo(id){
  this.context.getWithToken(id,'sales/getsinglesales/').
  subscribe( data => {
    let d = <any>data;
    this.salesInfo = d.data.salesInfo;
    this.salesDetails = d.data.salesdetails;

    if(this.salesInfo.vat > 0){
      this.vat = this.salesInfo.vat * (this.salesInfo.TotalPrice - this.salesInfo.discount)
    }else{
      this.vat = "0.00";
    }
    this.subTotal = this.salesInfo.TotalPrice - this.salesInfo.discount;
    this.finalTotal =  this.subTotal + (+this.vat);
    let dt = new Date (this.salesInfo.order_collect_date);
    dt.setDate(dt.getDate() + 30);
    this.amountDue = dt;
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
