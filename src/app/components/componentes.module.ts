import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';

import { MenuComponent } from './menu/menu.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CurriculoComponent } from './curriculo/curriculo.component';
import { RegistrarExperienciaComponent } from './registrar-experiencia/registrar-experiencia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    CurriculoComponent, 
    RegistrarExperienciaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthModule,
    SharedModule,
    RouterModule,
    AngularFileUploaderModule,
    NgxPermissionsModule.forChild()
  ],
  exports:[
    HeaderComponent,
    MenuComponent,
    CurriculoComponent
  ]
})
export class ComponentesModule { }
