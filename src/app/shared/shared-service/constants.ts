import { HttpHeaders } from "@angular/common/http";
export class Constants{
   public static  deployMode = 2; // 0 -> dev, 1-> Nig, 2 -> Beruit
   public  DM = Constants.deployMode;
   public readonly apiUrl = Constants.getAPI_URL(); 
 
   GetToken(){
       return localStorage.getItem('token');
   }


   static getAPI_URL (){
      if(this.deployMode == 0){
        return "http://localhost:81/flaxity/public/"; // dev
      }else if(this.deployMode == 1){
        return "http://flaxity.com/cisburoltd/public/"; // nig
      }else if(this.deployMode == 2){
        return "https://flaxity.com/cisburosal/public/"; //beruit
      }
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