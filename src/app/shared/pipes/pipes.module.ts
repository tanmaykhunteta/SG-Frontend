import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPipe } from './calendar/calendar.pipe';



@NgModule({
  declarations: [
    CalendarPipe
  ],
  imports: [
    CommonModule
  ],
  exports : [
    CalendarPipe
  ]
})
export class PipesModule { }
