import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


import { Usuario } from '../models/usuario.model';
import { catchError, tap } from 'rxjs/operators';
import { Vacante } from '../models/Vacante.model';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  subirCV(archivo: any) {
    const uploadData = new FormData();
    uploadData.append('filename', archivo, archivo.name);
    return this.http.post(`api/candidatos/CV`, uploadData).pipe(
      tap(()=>{
        this.setUsuario(archivo.name);
        archivo = null;
      })
    );
  }

  eliminarCV(nombreArchivo:string) {
    return this.http.delete(`api/candidatos/CV/${nombreArchivo}`).pipe(
      tap(() => {
        this.setUsuario();        
      })
    );
  }

  datosPersonales() {
    return this.http.get<Usuario>(`api/datos_personales`).pipe(
      tap(resp => localStorage.setItem('perfil', JSON.stringify(resp)))
    );
  }

  getUsuario(): Usuario {
    return JSON.parse(localStorage.getItem('perfil'));
  }

  setUsuario(cv:string = null) {    
    let usuario = this.getUsuario();    
    usuario.cv = cv;
    localStorage.setItem('perfil', JSON.stringify(usuario));
  }

  postularme(vacante: Vacante){
    vacante.postulado = true;
    return this.http.post('api/candidatos/postularme',{clave: vacante.empresa}).pipe(      
      catchError(error=>{
        vacante.postulado = false;
        return throwError(error);
      })
    )
  }
}
