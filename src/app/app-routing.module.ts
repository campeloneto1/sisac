import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './views/login/login.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { AdministracaoComponent } from './views/administracao/administracao.component';
import { AfastamentosComponent } from './views/afastamentos/afastamentos.component';
import { AfastamentosTiposComponent } from './views/afastamentos-tipos/afastamentos-tipos.component';
import { ArmamentoComponent } from './views/armamento/armamento.component';
import { ArmamentosComponent } from './views/armamentos/armamentos.component';
import { ArmamentosEmprestimosComponent } from './views/armamentos-emprestimos/armamentos-emprestimos.component';
import { ArmamentosTiposComponent } from './views/armamentos-tipos/armamentos-tipos.component';
import { CautelaComponent } from './views/cautela/cautela.component';
import { CidadesComponent } from './views/cidades/cidades.component';
import { CoresComponent } from './views/cores/cores.component';
import { DocumentoComponent } from './views/documento/documento.component';
import { DocumentosComponent } from './views/documentos/documentos.component';
import { EscalaComponent } from './views/escala/escala.component';
import { EscalasComponent } from './views/escalas/escalas.component';
import { EscalasModelosComponent } from './views/escalas-modelos/escalas-modelos.component';
import { EstadosComponent } from './views/estados/estados.component';
import { FeriasComponent } from './views/ferias/ferias.component';
import { FeriasGuiaComponent } from './views/ferias-guia/ferias-guia.component';
import { FichaComponent } from './views/ficha/ficha.component';
import { GraduacoesComponent } from './views/graduacoes/graduacoes.component';
import { IrsoComponent } from './views/irso/irso.component';
import { IrsosComponent } from './views/irsos/irsos.component';
import { IrsosFinanceirosComponent } from './views/irsos-financeiros/irsos-financeiros.component';
import { LogsComponent } from './views/logs/logs.component';
import { MarcasComponent } from './views/marcas/marcas.component';
import { MateriaisComponent } from './views/materiais/materiais.component';
import { MaterialEmprestimoComponent } from './views/material-emprestimo/material-emprestimo.component';
import { MateriaisEmprestimosComponent } from './views/materiais-emprestimos/materiais-emprestimos.component';
import { MateriaisTiposComponent } from './views/materiais-tipos/materiais-tipos.component';
import { ModelosComponent } from './views/modelos/modelos.component';
import { ModalidadesComponent } from './views/modalidades/modalidades.component';
import { PaisesComponent } from './views/paises/paises.component';
import { PatrimoniosComponent } from './views/patrimonios/patrimonios.component';
import { PatrimoniosTiposComponent } from './views/patrimonios-tipos/patrimonios-tipos.component';
import { PerfisComponent } from './views/perfis/perfis.component';
import { PromocoesComponent } from './views/promocoes/promocoes.component';
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
import { ValidacaoComponent } from './views/validacao/validacao.component';
import { VeiculosComponent } from './views/veiculos/veiculos.component';
import { VeiculoEmprestimoComponent } from './views/veiculo-emprestimo/veiculo-emprestimo.component';
import { VeiculosEmprestimosComponent } from './views/veiculos-emprestimos/veiculos-emprestimos.component';

import { RelEmparmamentosComponent } from './views/relatorios/rel-emparmamentos/rel-emparmamentos.component';
import { RelEmpmateriaisComponent } from './views/relatorios/rel-empmateriais/rel-empmateriais.component';
import { RelEmpveiculosComponent } from './views/relatorios/rel-empveiculos/rel-empveiculos.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'Validacao/:id',
    component: ValidacaoComponent,
  },
  {
    path: 'Inicio',
    canActivate: [AuthGuard],
    component: InicioComponent,
  },
  {
    path: 'Administracao',
    canActivate: [AuthGuard],
    component: AdministracaoComponent,
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
    path: 'Armamento/:id',
    canActivate: [AuthGuard],
    component: ArmamentoComponent,
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
    path: 'Cautela/:id',
    canActivate: [AuthGuard],
    component: CautelaComponent,
  },
  {
    path: 'Cidades',
    canActivate: [AuthGuard],
    component: CidadesComponent,
  },
  {
    path: 'Cores',
    canActivate: [AuthGuard],
    component: CoresComponent,
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
    path: 'Emprestimos-Armamentos',
    canActivate: [AuthGuard],
    component: ArmamentosEmprestimosComponent,
  },
  {
    path: 'Emprestimo-Material/:id',
    canActivate: [AuthGuard],
    component: MaterialEmprestimoComponent,
  },
  {
    path: 'Emprestimos-Materiais',
    canActivate: [AuthGuard],
    component: MateriaisEmprestimosComponent,
  },
  {
    path: 'Emprestimo-Veiculo/:id',
    canActivate: [AuthGuard],
    component: VeiculoEmprestimoComponent,
  },
  {
    path: 'Emprestimos-Veiculos',
    canActivate: [AuthGuard],
    component: VeiculosEmprestimosComponent,
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
    path: 'Ferias',
    canActivate: [AuthGuard],
    component: FeriasComponent,
  },
  {
    path: 'Ficha/:id',
    canActivate: [AuthGuard],
    component: FichaComponent,
  },
  {
    path: 'Guia-Ferias/:id',
    canActivate: [AuthGuard],
    component: FeriasGuiaComponent,
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
    path: 'Financeiro-Irso',
    canActivate: [AuthGuard],
    component: IrsosFinanceirosComponent,
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
    path: 'Materiais',
    canActivate: [AuthGuard],
    component: MateriaisComponent,
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
    path: 'Patrimonios',
    canActivate: [AuthGuard],
    component: PatrimoniosComponent,
  },
  {
    path: 'Tipos-Patrimonios',
    canActivate: [AuthGuard],
    component: PatrimoniosTiposComponent,
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
    path: 'Promocoes',
    canActivate: [AuthGuard],
    component: PromocoesComponent,
  },
  {
    path: 'Publicacoes',
    canActivate: [AuthGuard],
    component: PublicacoesComponent,
  },
  {
    path: 'Rel/Emp-Armamentos',
    canActivate: [AuthGuard],
    component: RelEmparmamentosComponent,
  },
  {
    path: 'Rel/Emp-Materiais',
    canActivate: [AuthGuard],
    component: RelEmpmateriaisComponent,
  },
  {
    path: 'Rel/Emp-Veiculos',
    canActivate: [AuthGuard],
    component: RelEmpveiculosComponent,
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
    path: 'Tipos-Materiais',
    canActivate: [AuthGuard],
    component: MateriaisTiposComponent,
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
 
  {
    path: 'Veiculos',
    canActivate: [AuthGuard],
    component: VeiculosComponent,
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
