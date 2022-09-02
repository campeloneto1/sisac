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
    OcorrenciaComponent
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
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), 
    DataTablesModule,
    SelectDropDownModule,
    AngularEditorModule,
    NgxPaginationModule
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
