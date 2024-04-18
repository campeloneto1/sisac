import { Injectable } from '@angular/core';
import { Router, Routes, mapToCanActivate } from '@angular/router';
import { StorageService } from './sistema/storage.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(
    private storageService: StorageService,
    private router: Router
) {}
 canActivate() {
    if (this.storageService.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
    
  }
}

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () =>
          import('./auth/auth.component').then((c) => c.AuthComponent),
      },
      {
        path: '',
        loadComponent: () =>
          import('./sistema/sistema.component').then((c) => c.SistemaComponent),
        canActivate: mapToCanActivate([AdminGuard]),
        children: [
          {
            path: 'Inicio',
            loadComponent: () =>
              import('./sistema/views/home/home.component').then((c) => c.HomeComponent),
          },
          {
            path: 'Atestados',
            loadComponent: () =>
              import('./sistema/views/policiais-atestados/policiais-atestados.component').then((c) => c.PoliciaisAtestadosComponent),
          },
          {
            path: 'Cidades',
            loadComponent: () =>
              import('./sistema/views/cidades/cidades.component').then((c) => c.CidadesComponent),
          },
          {
            path: 'Estados',
            loadComponent: () =>
              import('./sistema/views/estados/estados.component').then((c) => c.EstadosComponent),
          },
          {
            path: 'Ferias',
            loadComponent: () =>
              import('./sistema/views/policiais-ferias/policiais-ferias.component').then((c) => c.PoliciaisFeriasComponent),
          },
          {
            path: 'Graduacoes',
            loadComponent: () =>
              import('./sistema/views/graduacoes/graduacoes.component').then((c) => c.GraduacoesComponent),
          },
          {
            path: 'Paises',
            loadComponent: () =>
              import('./sistema/views/paises/paises.component').then((c) => c.PaisesComponent),
          },
          {
            path: 'Perfis',
            loadComponent: () =>
              import('./sistema/views/perfis/perfis.component').then((c) => c.PerfisComponent),
          },
          {
            path: 'Policiais',
            loadComponent: () =>
              import('./sistema/views/policiais/policiais.component').then((c) => c.PoliciaisComponent),
          },
          {
            path: 'Publicacoes',
            loadComponent: () =>
              import('./sistema/views/policiais-publicacoes/policiais-publicacoes.component').then((c) => c.PoliciaisPublicacoesComponent),
          },
          {
            path: 'PublicacoesTipos',
            loadComponent: () =>
              import('./sistema/views/publicacoes-tipos/publicacoes-tipos.component').then((c) => c.PublicacoesTiposComponent),
          },
          {
            path: 'Setores',
            loadComponent: () =>
              import('./sistema/views/setores/setores.component').then((c) => c.SetoresComponent),
          },
          {
            path: 'Sexos',
            loadComponent: () =>
              import('./sistema/views/sexos/sexos.component').then((c) => c.SexosComponent),
          },
          {
            path: 'Subunidades',
            loadComponent: () =>
              import('./sistema/views/subunidades/subunidades.component').then((c) => c.SubunidadesComponent),
          },
          {
            path: 'Unidades',
            loadComponent: () =>
              import('./sistema/views/unidades/unidades.component').then((c) => c.UnidadesComponent),
          },
          {
            path: 'Usuarios',
            loadComponent: () =>
              import('./sistema/views/users/users.component').then((c) => c.UsersComponent),
          },
        ],
      },
      {
        path:'**',
        loadComponent: () =>
          import('./auth/auth.component').then((c) => c.AuthComponent),
      }
];
