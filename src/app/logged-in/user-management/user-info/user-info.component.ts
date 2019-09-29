import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  userId : any;
  name : any;
  ngOnInit() {
    this.userId= this.route.params['value'].id;
    this.name = this.route.params['value'].name;
  }

}
