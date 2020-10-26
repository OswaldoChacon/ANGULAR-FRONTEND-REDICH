import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CurriculoComponent } from './components/curriculo/curriculo.component';
import { EmpleosComponent } from './paginas/empleos/empleos.component';
import { AuthGuard } from './guards/auth.guard'
import { NoAuthGuard } from './guards/no-auth.guard'
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: 'cuenta',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./paginas/admin/admin.module').then(m => m.AdminModule),
    data: { admin: true }
  },
  {
    path: 'curriculo',
    canActivate: [AuthGuard],
    component: CurriculoComponent,
    data: { admin: false }
  },

  {
    path: 'empleos',
    canActivate: [NoAuthGuard],
    component: EmpleosComponent,
    data: { invitado: false }
  },
  {
    path: '**',
    redirectTo: 'empleos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
