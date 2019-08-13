import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/shared-service/context.service';
import { Utils } from 'src/app/shared/shared-service/utils';

@Component({
  selector: 'app-my-sales-record',
  templateUrl: './my-sales-record.component.html',
  styleUrls: ['./my-sales-record.component.css']
})
export class MySalesRecordComponent implements OnInit {

  userId : any;
  constructor(public utils : Utils, private context : ContextService) { }

  ngOnInit() {
    this.userId = this.context.UserProfile().id;
  }

}
