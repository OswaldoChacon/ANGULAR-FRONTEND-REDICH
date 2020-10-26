import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta',
  template: `
            <div
              fxLayout="row"
              fxLayoutGap="12px"
              fxLayoutAlign="start center"
              style="color:red;  padding:12px;"
            >
              <mat-icon>warning</mat-icon>    
              <span>{{mensaje}}</span>
            </div>
          `,
})
export class AlertaComponent implements OnInit {

  @Input() mensaje: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
