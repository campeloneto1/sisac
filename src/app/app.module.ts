import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';

import { NgxMaskModule } from 'ngx-mask'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from "angular-datatables";
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { QRCodeModule } from 'angularx-qrcode';

import { LoginComponent } from './views/login/login.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { FooterComponent } from './views/footer/footer.component';
import { ControlbarComponent } from './views/controlbar/controlbar.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { PaisesComponent } from './views/paises/paises.component';
import { EstadosComponent } from './views/estados/estados.component';
import { CidadesComponent } from './views/cidades/cidades.component';
import { GraduacoesComponent } from './views/graduacoes/graduacoes.component';
import { MarcasComponent } from './views/marcas/marcas.component';
import { ModelosComponent } from './views/modelos/modelos.component';
import { PerfisComponent } from './views/perfis/perfis.component';
import { PostosComponent } from './views/postos/postos.component';
import { TurnosComponent } from './views/turnos/turnos.component';
import { SetoresComponent } from './views/setores/setores.component';
import { UnidadesComponent } from './views/unidades/unidades.component';
import { SubunidadesComponent } from './views/subunidades/subunidades.component';
import { PublicacoesComponent } from './views/publicacoes/publicacoes.component';
import { TiposPublicacoesComponent } from './views/tipos-publicacoes/tipos-publicacoes.component';
import { AfastamentosComponent } from './views/afastamentos/afastamentos.component';
import { IrsosComponent } from './views/irsos/irsos.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { DocumentosComponent } from './views/documentos/documentos.component';
import { TiposDocumentosComponent } from './views/tipos-documentos/tipos-documentos.component';
import { IrsoComponent } from './views/irso/irso.component';
import { DocumentoComponent } from './views/documento/documento.component';
import { EscalasComponent } from './views/escalas/escalas.component';
import { EscalasModelosComponent } from './views/escalas-modelos/escalas-modelos.component';
import { AfastamentosTiposComponent } from './views/afastamentos-tipos/afastamentos-tipos.component';
import { EscalaComponent } from './views/escala/escala.component';
import { ModalidadesComponent } from './views/modalidades/modalidades.component';
import { FichaComponent } from './views/ficha/ficha.component';
import { TiposOcorrenciasComponent } from './views/tipos-ocorrencias/tipos-ocorrencias.component';
import { OcorrenciasComponent } from './views/ocorrencias/ocorrencias.component';
import { OcorrenciaComponent } from './views/ocorrencia/ocorrencia.component';
import { LogsComponent } from './views/logs/logs.component';
import { ArmamentosComponent } from './views/armamentos/armamentos.component';
import { ArmamentosTiposComponent } from './views/armamentos-tipos/armamentos-tipos.component';
import { CoresComponent } from './views/cores/cores.component';
import { VeiculosComponent } from './views/veiculos/veiculos.component';
import { VeiculosEmprestimosComponent } from './views/veiculos-emprestimos/veiculos-emprestimos.component';
import { VeiculoEmprestimoComponent } from './views/veiculo-emprestimo/veiculo-emprestimo.component';
import { ArmamentoComponent } from './views/armamento/armamento.component';
import { MateriaisComponent } from './views/materiais/materiais.component';
import { MateriaisTiposComponent } from './views/materiais-tipos/materiais-tipos.component';
import { MateriaisEmprestimosComponent } from './views/materiais-emprestimos/materiais-emprestimos.component';
import { MaterialEmprestimoComponent } from './views/material-emprestimo/material-emprestimo.component';
import { ArmamentosEmprestimosComponent } from './views/armamentos-emprestimos/armamentos-emprestimos.component';
import { FeriasComponent } from './views/ferias/ferias.component';
import { PromocoesComponent } from './views/promocoes/promocoes.component';
import { FeriasGuiaComponent } from './views/ferias-guia/ferias-guia.component';
import { ValidacaoComponent } from './views/validacao/validacao.component';
import { IrsosFinanceirosComponent } from './views/irsos-financeiros/irsos-financeiros.component';
import { AdministracaoComponent } from './views/administracao/administracao.component';
import { CautelaComponent } from './views/cautela/cautela.component';
import { PatrimoniosComponent } from './views/patrimonios/patrimonios.component';
import { PatrimoniosTiposComponent } from './views/patrimonios-tipos/patrimonios-tipos.component';
import { RelEmpveiculosComponent } from './views/relatorios/rel-empveiculos/rel-empveiculos.component';
import { RelEmpmateriaisComponent } from './views/relatorios/rel-empmateriais/rel-empmateriais.component';
import { RelEmparmamentosComponent } from './views/relatorios/rel-emparmamentos/rel-emparmamentos.component';
import { RelPromocoesComponent } from './views/relatorios/rel-promocoes/rel-promocoes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ControlbarComponent,
    UsuariosComponent,
    PaisesComponent,
    EstadosComponent,
    CidadesComponent,
    GraduacoesComponent,
    MarcasComponent,
    ModelosComponent,
    PerfisComponent,
    PostosComponent,
    TurnosComponent,
    SetoresComponent,
    UnidadesComponent,
    SubunidadesComponent,
    PublicacoesComponent,
    TiposPublicacoesComponent,
    AfastamentosComponent,
    IrsosComponent,
    UsuarioComponent,
    DocumentosComponent,
    TiposDocumentosComponent,
    IrsoComponent,
    DocumentoComponent,
    EscalasComponent,
    EscalasModelosComponent,
    AfastamentosTiposComponent,
    EscalaComponent,
    ModalidadesComponent,
    FichaComponent,
    TiposOcorrenciasComponent,
    OcorrenciasComponent,
    OcorrenciaComponent,
    LogsComponent,
    ArmamentosComponent,
    ArmamentosTiposComponent,
    CoresComponent,
    VeiculosComponent,
    VeiculosEmprestimosComponent,
    VeiculoEmprestimoComponent,
    ArmamentoComponent,
    MateriaisComponent,
    MateriaisTiposComponent,
    MateriaisEmprestimosComponent,
    MaterialEmprestimoComponent,
    ArmamentosEmprestimosComponent,
    FeriasComponent,
    PromocoesComponent,
    FeriasGuiaComponent,
    ValidacaoComponent,
    IrsosFinanceirosComponent,
    AdministracaoComponent,
    CautelaComponent,
    PatrimoniosComponent,
    PatrimoniosTiposComponent,
    RelEmpveiculosComponent,
    RelEmpmateriaisComponent,
    RelEmparmamentosComponent,
    RelPromocoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), 
    DataTablesModule,
    SelectDropDownModule,
    AngularEditorModule,
    NgxPaginationModule,
    QRCodeModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
