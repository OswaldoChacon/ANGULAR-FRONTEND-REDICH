import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarVacanteComponent } from './registrar-vacante/registrar-vacante.component';
import { PostulantesComponent } from './postulantes/postulantes.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'registrar-vacante',        
        component: RegistrarVacanteComponent,
        data: { admin: true }
      },
      {
        path: 'postulantes',        
        component: PostulantesComponent,
        data: { admin: true }
      },
      {
        path:'**',
        redirectTo:'vacantes'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
