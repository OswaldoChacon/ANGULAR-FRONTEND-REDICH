import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Experiencia } from 'src/app/models/experiencia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css']
})
export class CurriculoComponent implements OnInit {

  @ViewChild('form') formComponent: any;
  experienciaActual: Experiencia = null;
  agregar: boolean = false;
  archivo: File
  constructor(private authService: AuthService,
    private experienciaService: ExperienciaService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.experienciaService.getExperiencias();
    this.usuarioService.datosPersonales().subscribe()
  }

  getEdad(fecha_nacimiento: any): number {
    fecha_nacimiento = new Date(fecha_nacimiento);
    let timeDiff = Math.abs(Date.now() - fecha_nacimiento.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  }

  get experiencias() {
    return this.experienciaService.getMisExperiencias();
  }

  registrarExperiencia() {
    this.formComponent.submitFormulario();
  }

  editarExperiencia(experiencia: Experiencia) {
    this.agregar = true;
    this.experienciaActual = experiencia;
  }

  cancelar() {
    this.agregar = false;
    this.experienciaActual = null;
  }

  eliminarExperiencia() {
    this.experienciaService.eliminarExperiencia(this.experienciaActual.empresa).subscribe(() => {
      this.agregar = false
      this.experienciaActual = null;
    });
  }

  onFileChanged(event) {
    this.archivo = event.target.files[0]
  }

  subirCV() {
    this.usuarioService.subirCV(this.archivo).subscribe();
  }

  eliminarCV(nombreArchivo: string) {
    this.usuarioService.eliminarCV(nombreArchivo).subscribe(()=>this.archivo = null);
  }

  get usuario(): Usuario {
    return this.usuarioService.getUsuario();
  }
}
