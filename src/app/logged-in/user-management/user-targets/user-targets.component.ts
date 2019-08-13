import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userTargetsColumn, DataPerPage } from 'src/app/shared/shared-service/tableColumns';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';
import { CdkTableService } from 'src/app/shared/shared-service/cdk-table';
import { ToasterService } from 'src/app/shared/shared-service/toaster.service';
declare var $ : any;

@Component({
  selector: 'app-user-targets',
  templateUrl: './user-targets.component.html',
  styleUrls: ['./user-targets.component.css']
})
export class UserTargetsComponent implements OnInit {

  private heros$;
  superlatives$ = new BehaviorSubject<{[superlativeName: string]: string}>({});
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  columns = userTargetsColumn;
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(DataPerPage);
  dataOnPage$ = new BehaviorSubject<any[]>([]);
  searchFormControl = new FormControl();
  sortKey$ = new BehaviorSubject<string>('');
  sortDirection$ = new BehaviorSubject<string>('asc');

  value = 'test';
  alllead : any=[];
  allMonths = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  constructor(private context : ContextService,public utils : Utils, private toaster : ToasterService,
     private fb : FormBuilder,  private cdktable : CdkTableService) { }

  year : any=[]
  ngOnInit() {
    this.getAllUsersTarget(0);
    this.generateForm();
    this.getAllInternalUsers();

    var lastDate = 2018;
    var thisYear = new Date();
    for(let i = 2018; i <= thisYear.getFullYear(); i++){
      this.year.push(i);
     
    }
   
  }

  clearForm(){

  } 
 
  EditUserTarget(d:any){
      this.form.patchValue({
        id : d.id,
        user_id : d.user_id,
        amount : d.amount,
        monthId : d.monthId,
        year : d.year
      });
  }
  Users : any;
  getAllInternalUsers(){
    this.utils.StartSpinner();
      this.context.getWithToken('','user/getallinternaluser').
      subscribe( data => {
        let d = <any>data;
        this.Users = d.data;
        console.log(d)
        this.utils.StopSpinner();
      }); 
  }

  submitted : boolean = false;
  form : FormGroup;
  generateForm(){
    this.form = this.fb.group({
      id : [0],
      user_id : [],
      amount : ['',Validators.required],
      monthId : ['',Validators.required],
      year : ['',Validators.required]
    });

    this.form.valueChanges.subscribe(val => {
      if (typeof val.amount === 'string') {
        const maskedVal = this.utils.Comma(val.amount);
        if (val.amount !== maskedVal) {
          this.form.patchValue({amount: maskedVal});
        }
      }
    });
  }

  get f () {return this.form.controls;}
 
  resetForm(){
    this.form.reset();
    this.form.patchValue({id:0});
  }

  getAllUsersTarget(id:any){

    this.utils.StartSpinner();
      this.context.getWithToken('/'+id+'/0','user/userTarget').
      subscribe( data => {
        let d = <any>data;
        this.alllead = d.data;
        if(d.data == null){
          this.alllead = {};
        }
        this.heros$ = new BehaviorSubject<{[name: string]: any}>(this.alllead);
       // this.companyInformation = <any>data;
        this.cdktable.GenerateCDKTable(this.tableDataSource$,this.currentPage$, this.pageSize$,this.heros$,
        this.searchFormControl,this.sortKey$,this.sortDirection$,this.dataOnPage$)
        console.log(d)
      this.utils.StopSpinner();
      });

  
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
    this.context.postWithToken(formData, 'user/createusertarget').subscribe(
      data=>{
        this.utils.StopSpinner();
        let d = <any>data;
        if(d.error == false){
          this.toaster.Success(d.message);
         
          this.ngOnInit();
        }else{
          this.toaster.Error(d.message);
        }

        $('#leadstory').modal("hide");
        console.log(data);
      }
    );
  }


} 
