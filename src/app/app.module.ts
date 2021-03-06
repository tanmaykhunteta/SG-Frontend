import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from './shared/interceptors/global.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AvatarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatToolbarModule,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
