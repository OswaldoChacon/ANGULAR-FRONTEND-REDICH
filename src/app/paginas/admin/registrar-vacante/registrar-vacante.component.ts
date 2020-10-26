import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { VacanteService } from '../../../services/vacante.service';

@Component({
  selector: 'app-registrar-vacante',
  templateUrl: './registrar-vacante.component.html',
  styleUrls: ['./registrar-vacante.component.css']
})
export class RegistrarVacanteComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  formVacante = this.formBuilder.group({
    titulo: ['', [Validators.required]],
    empresa: ['', [Validators.required]],
    sueldo: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    fecha_publicacion: ['', [Validators.required]],
    requisitos: this.formBuilder.array([this.crearFormControl()])
  });

  constructor(private formBuilder: FormBuilder,
    private vacanteService: VacanteService) { }

  ngOnInit(): void {
  }

  registrarVacante() {    
    this.vacanteService.registrarVacante(this.formVacante).subscribe(()=>this.form.resetForm());
  }

  get requisitos(){
    return this.formVacante.get('requisitos') as FormArray;
  }

  agregarRequisito() {    
    this.requisitos.push(this.crearFormControl());
  }

  removerRequisito(i: number) {        
    this.requisitos.removeAt(i);    
  }

  crearFormControl() {
    return this.formBuilder.group({
      nombre: this.formBuilder.control('', [Validators.required])
    });
  }
}
