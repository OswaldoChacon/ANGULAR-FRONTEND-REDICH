import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthComponent } from './auth.component'

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [       
            {
                path: 'registro',
                component: RegistroComponent
            },
            {
                path:'**',
                redirectTo:'registro'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
