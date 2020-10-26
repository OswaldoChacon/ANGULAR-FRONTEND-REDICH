import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { EmpleoService } from 'src/app/services/empleo.service';


@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css'],
  providers: [DatePipe]
})
export class PostulantesComponent implements OnInit {

  empresa: string;
  sexo: string = 'Indistinto';
  edad: number = 18;
  fecha_postulacion: any;

  postulantes: Usuario[] = [];
  constructor(private empleoService: EmpleoService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getPostulantes();
    this.fecha_postulacion = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getPostulantes() {
    this.empleoService.getPostulantes(this.empresa, this.sexo, this.edad, this.fecha_postulacion).subscribe((res: any) => {
      this.postulantes = res;
    })
  }

}
