import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertaComponent } from './alerta/alerta.component';
import { MaterialModule } from '../material.module';
import { CardProfileComponent } from './card-profile/card-profile.component';

@NgModule({
  declarations: [
    AlertaComponent,
    CardProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    AlertaComponent,
    CardProfileComponent
  ]
})
export class SharedModule { }
