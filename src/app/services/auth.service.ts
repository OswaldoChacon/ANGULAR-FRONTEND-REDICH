import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from './form-error.service';

const API_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient,
    private ngxPermissionsService: NgxPermissionsService,
    private formError: FormErrorService,
    private router: Router) { }

  login(formData: any) {
    return this.http.post('api/login', formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('perfil', JSON.stringify(resp.perfil));
        this.cargarPermisos();
        this.redirect();
      })
    );
  }

  registrarme(form: FormGroup) {
    return this.http.post('api/registro', form.value).pipe(
      tap(() => {
        this.login(form.value).subscribe();
      }
      ),
      catchError(error => {
        return this.formError.handleError(error, form)
      })
    )

  }

  cargarPermisos() {
    if (!this.token)
      this.ngxPermissionsService.addPermission('invitado');
    else if (this.isAdmin)
      this.ngxPermissionsService.addPermission('admin');
    else if (!this.isAdmin)
      this.ngxPermissionsService.addPermission('candidato');
  }

  logout() {
    this.ngxPermissionsService.flushPermissions();
    localStorage.clear();
    this.router.navigate(['empleos']);
    window.location.reload();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get isAdmin(): boolean {
    if (this.token)
      return jwt_decode(localStorage.getItem('token')).admin;
  }

  redirect() {
    if (!this.token)
      this.logout()
    else if (this.isAdmin) {
      this.router.navigate(['admin']);
      console.log("admi");
    }
    else
      this.router.navigate(['curriculo']);
  }
}
