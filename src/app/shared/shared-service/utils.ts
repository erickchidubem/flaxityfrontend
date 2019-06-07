import { Router } from "@angular/router";
import { ToasterService } from "./toaster.service";
import { Injectable } from "@angular/core";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Location} from '@angular/common';
declare var $:any;

@Injectable()
export class Utils {

    constructor(private Spinner : NgxUiLoaderService,private router:Router,
        public location : Location, private toaster : ToasterService){

    }


    goBack(){
        this.location.back();
    }

    Logout(){  
        localStorage.removeItem('token');
        localStorage.clear();
        this.router.navigate(['/']);
      
    }

    removeArray(arr, value){
        return arr.filter(function(ele){
          return ele != value;
        })
    }

    getDateTimePicker(control){
        $('#'+control).datepicker({
      
          todayHighlight: true
        });
    }

    StartSpinner(){
        this.StopSpinner();
        this.Spinner.start();
    }
    
    StopSpinner(){
        this.Spinner.stop();
    }

    invalidFormMessage(){
        this.toaster.Error("Some required fields are not filled properly");
    }

    decimalsOnly(evt,obj){
        var charCode = (evt.which) ? evt.which : evt.keyCode
           var value = obj.value;
           var dotcontains = String(value).indexOf(".") != -1;
           if (dotcontains)
               if (charCode == 46) return false;
           if (charCode == 46) return true;
           if (charCode > 31 && (charCode < 48 || charCode > 57))
               return false;
           return true
    }

    numberOnly(e): boolean {
        var keyCode = (e.which) ? e.which : e.keyCode;
        if ((keyCode >= 48 && keyCode <= 57) || (keyCode == 8))
            return true;
        else
            return false;  
    }

     Comma(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        let x = Num.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }
   convertToDateModel (datee){
        
        if(datee != null){
        let date = datee.split("-");
        let value = {year : +date[0],month : +date[1], day: +date[2].substring(0,2)};
        return value;
        }
    }

    convertDateModelToString(datee : any){
        if(datee != null){
        let date = datee.year+"-"+datee.month+"-"+datee.day;
        return date;
        }else{
            return "";
        }
    }

    intToOrdinalNumberString = (num: number): string => {
     num = Math.round(num);
     let numString = num.toString();
     if (Math.floor(num / 10) % 10 === 1) {
         return numString + "TH";
     }
     switch (num % 10) {
         case 1: return numString + "ST";
         case 2: return numString + "ND";
         case 3: return numString + "RD";
         default: return numString + "TH";
      }
    }


    getCurrency(){
        return "₦ ";
    }

    CurrencyName (){
        return "Naira ";
    }

    numberToWord(n){
    
    if(n == null){n= "";}
    let n1 = n.toString().split('.')[0];
    var string = n1.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words, and = 'and';
	/* Remove spaces and commas */
	string = string.replace(/[, ]/g,"");

	/* Is number zero? */
	if( parseInt( string ) === 0 ) {
		return 'zero';
	}
	
	/* Array of units as words */
	units = [ '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen' ];
	
	/* Array of tens as words */
	tens = [ '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety' ];
	
	/* Array of scales as words */
	scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ];
	
	/* Split user arguemnt into 3 digit chunks from right to left */
	start = string.length;
	chunks = [];
	while( start > 0 ) {
		end = start;
		chunks.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
	}
	
	/* Check if function has enough scale words to be able to stringify the user argument */
	chunksLen = chunks.length;
	if( chunksLen > scales.length ) {
		return '';
	}
	
	/* Stringify each integer in each chunk */
	words = [];
	for( i = 0; i < chunksLen; i++ ) {
		
		chunk = parseInt( chunks[i] );
		
		if( chunk ) {
			
			/* Split chunk into array of individual integers */
			ints = chunks[i].split( '' ).reverse().map( parseFloat );
		
			/* If tens integer is 1, i.e. 10, then add 10 to units integer */
			if( ints[1] === 1 ) {
				ints[0] += 10;
			}
			
			/* Add scale word if chunk is not zero and array item exists */
			if( ( word = scales[i] ) ) {
				words.push( word );
			}
			
			/* Add unit word if array item exists */
			if( ( word = units[ ints[0] ] ) ) {
				words.push( word );
			}
			
			/* Add tens word if array item exists */
			if( ( word = tens[ ints[1] ] ) ) {
				words.push( word );
			}
			
			/* Add 'and' string after units or tens integer if: */
			if( ints[0] || ints[1] ) {
				
				/* Chunk has a hundreds integer or chunk is the first of multiple chunks */
				if( ints[2] || (i + 1) > chunksLen ) {
					words.push( and );
				}

			
			}
			
			/* Add hundreds word if array item exists */
			if( ( word = units[ ints[2] ] ) ) {
				words.push( word + ' hundred' );
			}
			
		}
		
	}
	
	return words.reverse().join( ' ' );
}
}