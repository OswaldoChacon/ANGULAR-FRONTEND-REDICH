import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, finalize, tap } from 'rxjs/operators';
import { FormErrorService } from './form-error.service'
@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  constructor(private http: HttpClient,
    private formError: FormErrorService) { }

  registrarVacante(form: FormGroup){
    return this.http.post('api/admin/vacantes',form.value).pipe(      
      catchError(error=>{
        return this.formError.handleError(error,form);
      }),      
    )
  }
}
