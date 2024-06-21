import { User } from "../users/user";

export interface Perfil{
    id?: number;
    nome: string;
    
    administrador?: boolean;
    gestor?: boolean;
    relatorios?: boolean;

    armamentos?: boolean;
    armamentos_cad?: boolean;
    armamentos_edt?: boolean;
    armamentos_del?: boolean;

    armamentos_emprestimos?: boolean;
    armamentos_emprestimos_cad?: boolean;
    armamentos_emprestimos_edt?: boolean;
    armamentos_emprestimos_del?: boolean;

    contratos?: boolean;
    contratos_cad?: boolean;
    contratos_edt?: boolean;
    contratos_del?: boolean;

    empresas?: boolean;
    empresas_cad?: boolean;
    empresas_edt?: boolean;
    empresas_del?: boolean;

    materiais?: boolean;
    materiais_cad?: boolean;
    materiais_edt?: boolean;
    materiais_del?: boolean;

    materiais_policiais?: boolean;
    materiais_policiais_cad?: boolean;
    materiais_policiais_edt?: boolean;
    materiais_policiais_del?: boolean;

    materiais_consumo?: boolean;
    materiais_consumo_cad?: boolean;
    materiais_consumo_edt?: boolean;
    materiais_consumo_del?: boolean;

    materiais_consumo_entradas?: boolean;
    materiais_consumo_entradas_cad?: boolean;
    materiais_consumo_entradas_edt?: boolean;
    materiais_consumo_entradas_del?: boolean;

    materiais_consumo_saidas?: boolean;
    materiais_consumo_saidas_cad?: boolean;
    materiais_consumo_saidas_edt?: boolean;
    materiais_consumo_saidas_del?: boolean;

    patrimonios?: boolean;
    patrimonios_cad?: boolean;
    patrimonios_edt?: boolean;
    patrimonios_del?: boolean;

    policiais?: boolean;
    policiais_cad?: boolean;
    policiais_edt?: boolean;
    policiais_del?: boolean;

    policiais_atestados?: boolean;
    policiais_atestados_cad?: boolean;
    policiais_atestados_edt?: boolean;
    policiais_atestados_del?: boolean;

    policiais_cursos?: boolean;
    policiais_cursos_cad?: boolean;
    policiais_cursos_edt?: boolean;
    policiais_cursos_del?: boolean;

    policiais_ferias?: boolean;
    policiais_ferias_cad?: boolean;
    policiais_ferias_edt?: boolean;
    policiais_ferias_del?: boolean;

    policiais_publicacoes?: boolean;
    policiais_publicacoes_cad?: boolean;
    policiais_publicacoes_edt?: boolean;
    policiais_publicacoes_del?: boolean;

    policiais_requeridas?: boolean;
    policiais_requeridas_cad?: boolean;
    policiais_requeridas_edt?: boolean;
    policiais_requeridas_del?: boolean;

    servicos?: boolean;
    servicos_cad?: boolean;
    servicos_edt?: boolean;
    servicos_del?: boolean;


    usuarios?: boolean;
    usuarios_cad?: boolean;
    usuarios_edt?: boolean;
    usuarios_del?: boolean;

    veiculos?: boolean;
    veiculos_cad?: boolean;
    veiculos_edt?: boolean;
    veiculos_del?: boolean;

    veiculos_oficinas?: boolean;
    veiculos_oficinas_cad?: boolean;
    veiculos_oficinas_edt?: boolean;
    veiculos_oficinas_del?: boolean;

    veiculos_policiais?: boolean;
    veiculos_policiais_cad?: boolean;
    veiculos_policiais_edt?: boolean;
    veiculos_policiais_del?: boolean;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type Perfis = Array<Perfil>;