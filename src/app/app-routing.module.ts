import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'Inicio',
    component: InicioComponent
  },
  {
    path: 'Usuarios',
    component: UsuariosComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
