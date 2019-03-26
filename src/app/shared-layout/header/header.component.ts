import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/shared-service/utils';
import { ContextService } from 'src/app/shared/shared-service/context.service';
declare var $ : any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
toggle : boolean = false;
  constructor(public utils : Utils,private context : ContextService) { }

  userInfo : any =[];

  ngOnInit() {
    this.getUserInformation();
  }

  addMenu(){
      console.log('add')
      $("#wrapper").addClass("toggled");
      this.toggle= false;
  }

  removeMenu(){
     console.log('remove')
      $("#wrapper").removeClass("toggled"); 
      this.toggle = true;  
  }

  toggleBar(){
    if(this.toggle == false){
      this.removeMenu();
    }else{
      this.addMenu();
    }
    
  }


  getUserInformation(){
    this.utils.StartSpinner();
      this.context.postWithToken('','user/getinternaluser').
      subscribe( data => {
        let d = <any>data;
        this.userInfo = d.user;
     
        this.utils.StopSpinner();
      }); 
  }
}
