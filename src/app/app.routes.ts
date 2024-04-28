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
            path: 'Armamentos',
            loadComponent: () =>
              import('./sistema/views/armamentos/armamentos.component').then((c) => c.ArmamentosComponent),
          },
          {
            path: 'ArmamentosEmprestimos',
            loadComponent: () =>
              import('./sistema/views/armamentos-emprestimos/armamentos-emprestimos.component').then((c) => c.ArmamentosEmprestimosComponent),
          },
          {
            path: 'ArmamentosEmprestimosCautela/:id',
            loadComponent: () =>
              import('./sistema/views/armamentos-emprestimos/print-cautela/armamentos-emprestimos-print-cautela.component').then((c) => c.ArmamentosEmprestimosPrintCautela),
          },
          {
            path: 'ArmamentosEmprestimosJustificativa/:id',
            loadComponent: () =>
              import('./sistema/views/armamentos-emprestimos/print-justificativa/armamentos-emprestimos-print-justificativa.component').then((c) => c.ArmamentosEmprestimosPrintJustificativa),
          },
          {
            path: 'ArmamentosTipos',
            loadComponent: () =>
              import('./sistema/views/armamentos-tipos/armamentos-tipos.component').then((c) => c.ArmamentosTiposComponent),
          },
          {
            path: 'ArmamentosTamanhos',
            loadComponent: () =>
              import('./sistema/views/armamentos-tamanhos/armamentos-tamanhos.component').then((c) => c.ArmamentosTamanhosComponent),
          },
          {
            path: 'ArmamentosCalibres',
            loadComponent: () =>
              import('./sistema/views/armamentos-calibres/armamentos-calibres.component').then((c) => c.ArmamentosCalibresComponent),
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
            path: 'Cores',
            loadComponent: () =>
              import('./sistema/views/cores/cores.component').then((c) => c.CoresComponent),
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
            path: 'FeriasGuia/:id',
            loadComponent: () =>
              import('./sistema/views/policiais-ferias/print/policiais-ferias-print.component').then((c) => c.PoliciaisFeriasPrintComponent),
          },
          {
            path: 'Graduacoes',
            loadComponent: () =>
              import('./sistema/views/graduacoes/graduacoes.component').then((c) => c.GraduacoesComponent),
          },
          {
            path: 'ManutencoesTipos',
            loadComponent: () =>
              import('./sistema/views/manutencoes-tipos/manutencoes-tipos.component').then((c) => c.ManutencoesTiposComponent),
          },
          {
            path: 'Marcas',
            loadComponent: () =>
              import('./sistema/views/marcas/marcas.component').then((c) => c.MarcasComponent),
          },
          {
            path: 'Modelos',
            loadComponent: () =>
              import('./sistema/views/modelos/modelos.component').then((c) => c.ModelosComponent),
          },
          {
            path: 'Oficinas',
            loadComponent: () =>
              import('./sistema/views/oficinas/oficinas.component').then((c) => c.OficinasComponent),
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
            path: 'Policial/:id',
            loadComponent: () =>
              import('./sistema/views/policiais/policial/policial.component').then((c) => c.PolicialComponent),
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
          {
            path: 'Veiculos',
            loadComponent: () =>
              import('./sistema/views/veiculos/veiculos.component').then((c) => c.VeiculosComponent),
          },
          {
            path: 'VeiculosOficinas',
            loadComponent: () =>
              import('./sistema/views/veiculos-oficinas/veiculos-oficinas.component').then((c) => c.VeiculosOficinasComponent),
          },
          {
            path: 'VeiculosTipos',
            loadComponent: () =>
              import('./sistema/views/veiculos-tipos/veiculos-tipos.component').then((c) => c.VeiculosTiposComponent),
          },
          {
            path:'**',
            redirectTo: '/Inicio'
          }
        ],
      },
      {
        path:'**',
        loadComponent: () =>
          import('./auth/auth.component').then((c) => c.AuthComponent),
      }
];
