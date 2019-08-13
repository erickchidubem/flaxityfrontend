import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/shared-service/context.service';

@Component({
  selector: 'app-all-leads-story',
  templateUrl: './all-leads-story.component.html',
  styleUrls: ['./all-leads-story.component.css']
})
export class AllLeadsStoryComponent implements OnInit {

  userId : any;
  departmentId : any;
  viewType : any=1;
  constructor(private context : ContextService) { }

  ngOnInit() {
    this.departmentId = this.context.UserProfile().roleId;
    this.userId = this.context.UserProfile().id;
    // if(this.context.UserProfile().roleId == 1){
    //   this.viewType = 1;
    // }

    console.log(this.departmentId)
  }

}
 