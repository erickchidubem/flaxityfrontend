import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-sidebar',
  templateUrl: './primary-sidebar.component.html',
  styleUrls: ['./primary-sidebar.component.css']
})
export class PrimarySidebarComponent implements OnInit {

  userInfo : any=[];
  grantAccess : boolean = false;
  constructor(public utils : Utils, private context : ContextService,private router : Router) { }

  departmentId : any;
  designationId : any;
  roleId : any;
  ngOnInit() {
    this.getUserInformation();
    this.departmentId = this.context.UserProfile().departmentId;
    this.designationId = this.context.UserProfile().designationId;
    this.roleId = this.context.UserProfile().roleId;
    this.MenuManagement();
  }


  MenuManagement(){
    if(this.roleId == 1){
      this.userManagement = true;
      
      this.leadAndAccount = true;
      this.createLead = true;
      this.viewAllLeads = true;
      this.viewAllAccounts = true;
      this.leadStory = true;

      this.maintenance = true;
      this.viewMachine = true;
      this.createMachine = true;
      this.serviceCall = true;
      this.followUpCall = true;
      this.createCall = true;


     this.wareHouse = true;
     this.allProduct = true;
     this.createProduct = true;
     this.shipItem= true;
     
     this.processSales= true;
     this.makesSales= true;
     this.supplyTickets= true;
     this.profomaInvoice= true;
    
     this.contractBilling = true;
     this.createContract = true;
     this.viewContract= true;
     this.viewBilling = true;

     this.settings  = true;
     this.categorySetting = true;
      
    }else if(this.roleId == 0){
      if(this.departmentId == 2){
        this.leadAndAccount = true;
        this.createLead = true;
       // this.viewAllLeads = true;
       // this.viewAllAccounts = true;
        this.leadStory = true;

        this.wareHouse = true;
        this.allProduct = true;
       // this.createProduct = true;
       // this.shipItem= true;

       this.processSales= true;
       this.makesSales= true;
      // this.supplyTickets= true;
      // this.profomaInvoice= true;
      }
 
      if(this.departmentId == 3){
        this.maintenance = true;
        this.viewMachine = true;
       // this.createMachine = true;
        this.serviceCall = true;
        this.followUpCall = true;
        //this.createCall = true;

        if(this.designationId == 5){

        }
      }
    }
  }

  userManagement : boolean = false;


//-------------lead management -------------------//
  leadAndAccount : boolean = false;
  createLead : boolean = false;
  viewAllLeads : boolean = false;
  viewMyLeads : boolean = true;
  viewAllAccounts : boolean = false;
  leadStory : boolean = false;
//-------------lead management -------------------//

//-----------maintenance management --------------//
 maintenance : boolean = false;
 viewMachine : boolean = false;
 createMachine : boolean = false;
 serviceCall : boolean = false;
 followUpCall : boolean = false;
 createCall : boolean = false;
//-----------maintenance management --------------//

//--------wareHouse management ------------------//
  wareHouse : boolean = false;
  allProduct : boolean = false;
  createProduct : boolean = false;
  shipItem : boolean = false;
//--------wareHouse management ------------------//


//----------process sales ----------------//
  processSales : boolean = false;
  makesSales : boolean = false;
  supplyTickets : boolean = false;
  profomaInvoice : boolean = false;

//--------process sales -----------------//


// --------contract Billing ------------//
  contractBilling : boolean = false;
  createContract : boolean = false;
  viewContract : boolean = false;
  viewBilling : boolean = false;

// --------contract Billing ------------//


// --------settings Billing ------------//
  settings : boolean = false;
  categorySetting : boolean = false;
  
// --------settings Billing ------------//

  getUserInformation(){
    //this.utils.StartSpinner();
      this.context.postWithToken('','user/getinternaluser').
      subscribe( data => {
        let d = <any>data;
        this.userInfo = d.user;
       
        console.log(d.user)
        console.log(this.userInfo.changePassword) ;
        this.checkIfChangedPassword(this.userInfo.changePassword)
     //   this.utils.StopSpinner();
      }); 
  }

  checkIfChangedPassword(id){
    if(id == 0){
       this.router.navigate(["/access/users/change-password"]);
       this.grantAccess = false;
    }else{
      this.grantAccess = true;
    }
  }

}
