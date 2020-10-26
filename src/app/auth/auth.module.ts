import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material.module';
import { ComponentesModule } from '../components/componentes.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    AuthComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule
    // ComponentesModule
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthModule { }
