import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(private http:HttpClient,private config: Constants) { }

  getWithToken(DataObject : string, SubAPIURL : string){
    return this.http.get(this.config.apiUrl + SubAPIURL+DataObject,{ headers:this.config.GetHttpHeadersToken()} );
  }


  postWithToken(DataObject : any,SubAPIURL : string){
    return this.http.post(this.config.apiUrl + SubAPIURL, DataObject,{ headers:this.config.GetHttpHeadersToken()} );
  }


  getWithNoToken(DataObject : string, SubAPIURL : string){
    return this.http.get(this.config.apiUrl + SubAPIURL+DataObject, {headers : this.config.GetHttpHeadersAnonymous()});
  }


  postWithNoToken(DataObject : any,SubAPIURL : string){
    return this.http.post(this.config.apiUrl + SubAPIURL, DataObject,{ headers:this.config.GetHttpHeadersAnonymous()} );
  }


}
