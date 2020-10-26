import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Experiencia } from 'src/app/models/experiencia.model';
import { ExperienciaService } from '../../services/experiencia.service';
@Component({
  selector: 'app-registrar-experiencia',
  templateUrl: './registrar-experiencia.component.html',
  styleUrls: ['./registrar-experiencia.component.css']
})
export class RegistrarExperienciaComponent implements OnInit {

  @Output() guardando: EventEmitter<boolean> = new EventEmitter();
  @Input() experiencia: Experiencia;
  editar: boolean = false;
  formExperiencia = this.formBuilder.group({
    puesto: ['',[Validators.required]],
    empresa: ['', [Validators.required]],
    fecha_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    actividades: ['', [Validators.required]],
  });
  constructor(private formBuilder: FormBuilder,
    private experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    if (this.experiencia) {
      this.editar = true;  
      this.cargarFormulario(this.experiencia);
    }
  }

  submitFormulario() {
    if (this.editar)
      this.actualizarExperiencia();
    else
      this.registrarExperiencia()
  }
  
  registrarExperiencia() {
    this.experienciaService.registrarExperiencia(this.formExperiencia).subscribe(() => {
      this.guardando.emit(true);
    });
  }

  actualizarExperiencia() {
    this.experienciaService.actualizarExperiencia(this.formExperiencia, this.experiencia.empresa).subscribe(() => {
      this.guardando.emit(true);
    });
  }

  cargarFormulario(experiencia: Experiencia) {
    this.formExperiencia.setValue({
      puesto: experiencia.puesto,
      empresa: experiencia.empresa,
      fecha_inicio: experiencia.fecha_inicio,
      fecha_fin: experiencia.fecha_fin,
      actividades: experiencia.actividades
    });
  }
}
