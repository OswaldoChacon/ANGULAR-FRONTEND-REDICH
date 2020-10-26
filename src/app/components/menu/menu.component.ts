import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  roles: [];
  constructor(private authService: AuthService,
    ) { }

  ngOnInit(): void {    
  }

  get token() {
    return this.authService.token;
  }

  logout() {
    this.authService.logout();    
  }

}
