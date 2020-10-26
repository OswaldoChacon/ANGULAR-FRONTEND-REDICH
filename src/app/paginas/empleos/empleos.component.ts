import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { AuthDialogComponent } from 'src/app/dialogs/auth-dialog/auth-dialog.component';
import { Vacante } from 'src/app/models/Vacante.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmpleoService } from 'src/app/services/empleo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-empleos',
  templateUrl: './empleos.component.html',
  styleUrls: ['./empleos.component.css']
})
export class EmpleosComponent implements OnInit {

  empleos: any = [];
  total: number;
  por_pagina: number;
  salario: number = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private empleoService: EmpleoService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => {
      this.getEmpleos();
    })
    ).subscribe();
    this.getEmpleos();
  }

  getEmpleos() {
    this.empleoService.getEmpleos(this.paginator.pageIndex + 1, this.salario).subscribe((empleos: any) => {
      this.empleos = empleos.data
      this.total = empleos.total;
      this.por_pagina = empleos.per_page;
    });
  }

  postularme(vacante: Vacante) {
    if (!this.authService.token) {
      const dialogRef = this.dialog.open(AuthDialogComponent);
    } else {
      this.usuarioService.postularme(vacante).subscribe();
    }
  }
}
