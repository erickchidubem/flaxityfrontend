import { AbstractControl } from "@angular/forms";


export function PasswordValidator(control : AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
        const cnfpassvalue = control.value;
        const passControl = control.root.get('newPassword');

        if(passControl){
            const passValue = passControl.value;
            if(passValue !== cnfpassvalue){
                return {
                    isError : true
                };
            }
        }
    }
    return null;
}