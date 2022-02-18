
import {NgModule} from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import { MatInputModule, } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule } from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCommonModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import {CdkTableModule} from '@angular/cdk/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatRadioModule } from '@angular/material/radio'
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
const material =[
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCommonModule,
    MatSidenavModule,
    MatIconModule,
    CdkTableModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FlexLayoutModule, 
    MatProgressBarModule,
    MatSnackBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatMenuModule
];

@NgModule({
  imports: material,
  exports: material
})

export class MaterialModule { }
