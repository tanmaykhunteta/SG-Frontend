import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomErrors {
    static unmatchedPswds = "unmatchedPswds"
    static password = {
        noLower : "nolowercasealpha",
        noDigit : "nodigit",
        noUpper : "nouppercasealpha",
        noSpecialChar : "nospecialchar"
    }
}


export class CustomValidators {
    static match_pswds_validator(pswd1 : string = 'pswd', pswd2 : string = 'cnfm_pswd', setErrorTo: string[] = ['cnfm_pswd']) : ValidatorFn {
		return (controls : AbstractControl) : ValidationErrors | null => {
			if((controls.get(pswd1)?.value || controls.get(pswd2)?.value) && controls.get(pswd1)?.value  !== controls.get(pswd2)?.value) {
				setErrorTo.forEach((controlName) => {
					controls.get(controlName)?.setErrors({
						[CustomErrors.unmatchedPswds] : true
					})
				})
				return {[CustomErrors.unmatchedPswds] :true}
			} 
			return null;
		}
	}

    static password_pattern() : ValidatorFn {
        return (pswdControl : AbstractControl) : ValidationErrors | null => {
            const p = pswdControl.value;
            const errors : any = {}
            let invalid = false
            if (p.length < 8) {
                errors['minlength'] = {}
                errors['minlength'].requiredLength = 8;
                invalid = true
            }
            if (p.search(/[a-z]/) < 0) {
                errors[CustomErrors.password.noLower] = true
                invalid = true
            }
            if (p.search(/[A-Z]/) < 0) {
                errors[CustomErrors.password.noUpper] = true
                invalid = true
            }
            if (p.search(/[$@&*!\(\)\.]/) < 0) {
                errors[CustomErrors.password.noSpecialChar] = true;
                invalid = true
            }
            if (p.search(/[0-9]/) < 0) {
                errors[CustomErrors.password.noDigit] = true
                invalid = true
            }
            return invalid ? errors : null;
        }
    }
}
