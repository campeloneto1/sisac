import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './views/login/login.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { AfastamentosComponent } from './views/afastamentos/afastamentos.component';
import { AfastamentosTiposComponent } from './views/afastamentos-tipos/afastamentos-tipos.component';
import { ArmamentosComponent } from './views/armamentos/armamentos.component';
import { ArmamentosTiposComponent } from './views/armamentos-tipos/armamentos-tipos.component';
import { CidadesComponent } from './views/cidades/cidades.component';
import { DocumentoComponent } from './views/documento/documento.component';
import { DocumentosComponent } from './views/documentos/documentos.component';
import { EscalaComponent } from './views/escala/escala.component';
import { EscalasComponent } from './views/escalas/escalas.component';
import { EscalasModelosComponent } from './views/escalas-modelos/escalas-modelos.component';
import { EstadosComponent } from './views/estados/estados.component';
import { FichaComponent } from './views/ficha/ficha.component';
import { GraduacoesComponent } from './views/graduacoes/graduacoes.component';
import { IrsoComponent } from './views/irso/irso.component';
import { IrsosComponent } from './views/irsos/irsos.component';
import { LogsComponent } from './views/logs/logs.component';
import { MarcasComponent } from './views/marcas/marcas.component';
import { ModelosComponent } from './views/modelos/modelos.component';
import { ModalidadesComponent } from './views/modalidades/modalidades.component';
import { PaisesComponent } from './views/paises/paises.component';
import { PerfisComponent } from './views/perfis/perfis.component';
import { PostosComponent } from './views/postos/postos.component';
import { PublicacoesComponent } from './views/publicacoes/publicacoes.component';
import { OcorrenciaComponent } from './views/ocorrencia/ocorrencia.component';
import { OcorrenciasComponent } from './views/ocorrencias/ocorrencias.component';
import { SetoresComponent } from './views/setores/setores.component';
import { SubunidadesComponent } from './views/subunidades/subunidades.component';
import { TiposPublicacoesComponent } from './views/tipos-publicacoes/tipos-publicacoes.component';
import { TiposDocumentosComponent } from './views/tipos-documentos/tipos-documentos.component';
import { TiposOcorrenciasComponent } from './views/tipos-ocorrencias/tipos-ocorrencias.component';
import { TurnosComponent } from './views/turnos/turnos.component';
import { UnidadesComponent } from './views/unidades/unidades.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { UsuarioComponent } from './views/usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'Inicio',
    canActivate: [AuthGuard],
    component: InicioComponent,
  },
  {
    path: 'Afastamentos',
    canActivate: [AuthGuard],
    component: AfastamentosComponent,
  },
  {
    path: 'Tipos-Afastamentos',
    canActivate: [AuthGuard],
    component: AfastamentosTiposComponent,
  },
  {
    path: 'Armamentos',
    canActivate: [AuthGuard],
    component: ArmamentosComponent,
  },
  {
    path: 'Tipos-Armamentos',
    canActivate: [AuthGuard],
    component: ArmamentosTiposComponent,
  },
  {
    path: 'Cidades',
    canActivate: [AuthGuard],
    component: CidadesComponent,
  },
  {
    path: 'Documento/:id',
    canActivate: [AuthGuard],
    component: DocumentoComponent,
  },
  {
    path: 'Documentos',
    canActivate: [AuthGuard],
    component: DocumentosComponent,
  },
  {
    path: 'Escala/:id',
    canActivate: [AuthGuard],
    component: EscalaComponent,
  },
  {
    path: 'Escalas',
    canActivate: [AuthGuard],
    component: EscalasComponent,
  },
  {
    path: 'Escalas-Modelos',
    canActivate: [AuthGuard],
    component: EscalasModelosComponent,
  },
  {
    path: 'Estados',
    canActivate: [AuthGuard],
    component: EstadosComponent,
  },
  {
    path: 'Ficha/:id',
    canActivate: [AuthGuard],
    component: FichaComponent,
  },
  {
    path: 'Graduacoes',
    canActivate: [AuthGuard],
    component: GraduacoesComponent,
  },
  {
    path: 'Irso/:id',
    canActivate: [AuthGuard],
    component: IrsoComponent,
  },
  {
    path: 'Irsos',
    canActivate: [AuthGuard],
    component: IrsosComponent,
  },
  {
    path: 'Logs',
    canActivate: [AuthGuard],
    component: LogsComponent,
  },
  {
    path: 'Marcas',
    canActivate: [AuthGuard],
    component: MarcasComponent,
  },
  {
    path: 'Modelos',
    canActivate: [AuthGuard],
    component: ModelosComponent,
  },
  {
    path: 'Modalidades',
    canActivate: [AuthGuard],
    component: ModalidadesComponent,
  },
  {
    path: 'Ocorrencia/:id',
    canActivate: [AuthGuard],
    component: OcorrenciaComponent,
  },
  {
    path: 'Ocorrencias',
    canActivate: [AuthGuard],
    component: OcorrenciasComponent,
  },
  {
    path: 'Paises',
    canActivate: [AuthGuard],
    component: PaisesComponent,
  },
  {
    path: 'Perfis',
    canActivate: [AuthGuard],
    component: PerfisComponent,
  },
  {
    path: 'Postos',
    canActivate: [AuthGuard],
    component: PostosComponent,
  },
  {
    path: 'Publicacoes',
    canActivate: [AuthGuard],
    component: PublicacoesComponent,
  },
  {
    path: 'Setores',
    canActivate: [AuthGuard],
    component: SetoresComponent,
  },
  {
    path: 'Subunidades',
    canActivate: [AuthGuard],
    component: SubunidadesComponent,
  },
  {
    path: 'Turnos',
    canActivate: [AuthGuard],
    component: TurnosComponent,
  },
  {
    path: 'Tipos-Documentos',
    canActivate: [AuthGuard],
    component: TiposDocumentosComponent,
  },
  {
    path: 'Tipos-Publicacoes',
    canActivate: [AuthGuard],
    component: TiposPublicacoesComponent,
  },
  {
    path: 'Tipos-Ocorrencias',
    canActivate: [AuthGuard],
    component: TiposOcorrenciasComponent,
  },
  {
    path: 'Unidades',
    canActivate: [AuthGuard],
    component: UnidadesComponent,
  },
  {
    path: 'Usuarios',
    canActivate: [AuthGuard],
    component: UsuariosComponent,
  },
  {
    path: 'Usuario/:id',
    canActivate: [AuthGuard],
    component: UsuarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
