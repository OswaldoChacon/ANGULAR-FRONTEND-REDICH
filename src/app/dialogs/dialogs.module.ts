import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../app/material.module';

import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AuthDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule,
    RouterModule
  ],
  exports:[
    AuthDialogComponent
  ]  
})
export class DialogsModule { }
