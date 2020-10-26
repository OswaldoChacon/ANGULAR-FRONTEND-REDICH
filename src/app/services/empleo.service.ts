import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Vacante } from '../models/vacante.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpleoService {

  private empleos: Vacante[];
  constructor(private http: HttpClient) { }

  getEmpleos(pagina: number,salario:number) {
    return this.http.get<Vacante[]>('api/vacantes', {
      params: new HttpParams()
        .set('page', pagina.toString())
        .set('salario', salario.toString())
    });
  }

  getPostulantes(empresa: string, sexo: string, edad: number, fecha_postulacion: string) {
    return this.http.get('api/admin/postulados', {
      params: new HttpParams()
        .set('empresa', empresa)
        .set('sexo', sexo)
        .set('edad', edad.toString())
        .set('fecha_postulacion', fecha_postulacion)
    });
  }

  // postularme(vacante: Vacante){
  //   vacante.postulado = true;
  //   return this.http.post('api/candidatos/postularme',{clave: vacante.empresa}).pipe(      
  //     catchError(error=>{
  //       vacante.postulado = false;
  //       return throwError(error);
  //     })
  //   )
  // }
}
