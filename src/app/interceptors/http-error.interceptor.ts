import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let tokenReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.token}`
      }
    });
    this.spinnerService.show();
    return next.handle(tokenReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
          if (error.status === 401)
            this.handleAuthError();
          else if (error.status >= 500)
            this.toastrService.error('Inténtelo de nuevo', 'Ha ocurrido un error con el servidor');
          else if (error.error.message)
            this.toastrService.error(error.error.message, '');
        }
        return throwError(error);
      }),
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }

  handleAuthError() {
    this.authService.logout();
  }
}
