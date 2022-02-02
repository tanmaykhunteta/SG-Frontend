import { Pipe, PipeTransform } from '@angular/core';
import { config } from 'src/config/config'

@Pipe({
  name: 'calendar',
})
export class CalendarPipe implements PipeTransform {

	/**
	 * 
	 * @param empty empty string as we are transforming nothing 
	 * @param args different args for different return values 
	 * @example 
	 * usage : ("years" | calendar:13:120), ("years" | calendar:null:120), ("years" | calendar:13);
	 * 
	 * arg[0]: a numeric value for min age restriction (use pass for default), default is config.MIN_REGISTRATION_AGE (13);
	 * 
	 * arg[1]: numeric max age restriction value, startYear = currentYear - max_age_restriction
	 * @returns number[] either date range or month range or year range
	 */
	transform(value: "years" | "dates" | "months", ...args: any[]): number[] {
		console.count(`calendar pipe for ${value} and and args ${args}`)
		const date = new Date();
		if(value === "years") {
			const currentYear = date.getFullYear();

			if(args[0] && typeof args[0] !== "number" || args[0] < 0) 
				throw new Error("invalid arg[0] to pipe")
			if(args[1] && typeof args[1] !== "number" || args[1] < 0)
				throw new Error("invalid arg[1] to pipe")

			const max_age_restrict = typeof args[1] === "number"  && args[1] >= 0? args[1] : 100;
			const startYear = currentYear - max_age_restrict;

			const min_age_restrict = typeof args[0] === "number" && args[0] >= 0 ? args[0] : config.MIN_REGISTRATION_AGE
			const endYear = currentYear - min_age_restrict;

			const yearRange = [];
			for(let i= endYear; i>= startYear; i--) 
				yearRange.push(i);
				
			return yearRange;
		}
		return []
	}

}
