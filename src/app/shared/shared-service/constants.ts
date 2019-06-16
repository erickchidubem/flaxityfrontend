import { HttpHeaders } from "@angular/common/http";
export class Constants{
   //public static API_URL = "http://flaxity.com/cisburoltd/public/"; // NIGERIAN ENVIROMENT
   public static API_URL ="http://localhost:81/flaxity/public/"; //DEV ENVIROMENT
  // public static API_URL = "https://flaxity.com/cisburosal/public/";   // LEBANON ENVIROMENT
   public readonly apiUrl = Constants.API_URL; 
 
   GetToken(){
       return localStorage.getItem('token');
   }

   GetHttpHeadersToken() : HttpHeaders{
       const headers = this.GetHttpHeadersAnonymous()
                           .set('Authorization', 'Bearer ' + this.GetToken());      
       return headers;
   }

  GetHttpHeadersAnonymous() : HttpHeaders{
    const headers = new HttpHeaders().set('content-type', 'application/json');                             
    return headers;
  }

    
 
}