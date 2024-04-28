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

    policiais?: boolean;
    policiais_cad?: boolean;
    policiais_edt?: boolean;
    policiais_del?: boolean;

    policiais_atestados?: boolean;
    policiais_atestados_cad?: boolean;
    policiais_atestados_edt?: boolean;
    policiais_atestados_del?: boolean;

    policiais_ferias?: boolean;
    policiais_ferias_cad?: boolean;
    policiais_ferias_edt?: boolean;
    policiais_ferias_del?: boolean;

    policiais_publicacoes?: boolean;
    policiais_publicacoes_cad?: boolean;
    policiais_publicacoes_edt?: boolean;
    policiais_publicacoes_del?: boolean;

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

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type Perfis = Array<Perfil>;