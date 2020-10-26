import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  // styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro = this.formBuilder.group({
    nombre : ['',[Validators.required]],
    apellidos : ['',[Validators.required]],
    fecha_nacimiento : ['',[Validators.required]],
    sexo : ['',[Validators.required]],
    email : ['',[Validators.required, Validators.email]],
    password : ['',[Validators.required]],    
  });
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  registrarme(){
    this.authService.registrarme(this.formRegistro).subscribe();
  }
}
