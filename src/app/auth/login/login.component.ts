import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  });
  hide = true;
  constructor(private formBuilder : FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.formLogin.value).subscribe(()=>{
      this.formLogin.reset();
    });
  }

  get token(){
    return this.authService.token
  }
}
