import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FormErrorService } from './form-error.service';
import { FormGroup } from '@angular/forms';
import { Experiencia } from '../models/experiencia.model';
const API_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {


  private misExperiencias: Experiencia[] = [];

  constructor(private http: HttpClient,
    private formError: FormErrorService) { }

  getExperiencias() {
    return this.http.get<Experiencia[]>(`api/candidatos/experiencias`).subscribe(experiencias => {
      this.misExperiencias = experiencias;
    });
  }

  registrarExperiencia(form: FormGroup) {
    return this.http.post('api/candidatos/experiencias', form.value).pipe(
      tap(() => {
        this.agregarExperiencia(form.value);
        form.reset();
      }),
      catchError(error => {
        return this.formError.handleError(error, form)
      })
    );
  }

  actualizarExperiencia(form: FormGroup, clave: string){
    return this.http.put(`api/candidatos/experiencias/${clave}`, form.value).pipe(
      tap(() => {
        this.modificarExperiencia(form.value);
        form.reset();
      }),
      catchError(error => {
        return this.formError.handleError(error, form)
      })
    );
  }

  eliminarExperiencia(clave: string){
    return this.http.delete(`api/candidatos/experiencias/${clave}`).pipe(
      tap(()=>this.removerExperiencia(clave))
    );
  }

  getMisExperiencias() {
    return this.misExperiencias;
  }

  agregarExperiencia(experiencia: Experiencia) {    
    this.misExperiencias.push(experiencia);    
  }

  modificarExperiencia(experiencia: Experiencia){
    let experienciaIndex = this.misExperiencias.findIndex(experienciaItem=>experienciaItem.empresa = experiencia.empresa);
    this.misExperiencias[experienciaIndex] = experiencia;
  }

 removerExperiencia(clave:string){
   this.misExperiencias = this.misExperiencias.filter(experienciaItem=>experienciaItem.empresa != clave);
 }
}
