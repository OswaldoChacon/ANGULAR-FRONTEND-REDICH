import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleosComponent } from './paginas/empleos/empleos.component';
import { DialogsModule } from './dialogs/dialogs.module'
import { ComponentesModule } from './components/componentes.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,    
    EmpleosComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentesModule,
    AuthModule,
    DialogsModule,
    SharedModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      maxOpened: 1,
      timeOut: 3500,
      positionClass: 'toast-bottom-left',
    }),
    NgxPermissionsModule.forRoot(),
    NgxSpinnerModule,
    // AngularFileUploaderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
