import { User } from "../users/user";

export interface AfastamentoTipo{
    id?: number;
    nome: string;
    atestado?: boolean;
    paternidade?: boolean;
    maternidade?: boolean;
    luto?: boolean;
    lts?: boolean;
    ltsd?: boolean;
    ltip?: boolean;
    dias?: number;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type AfastamentosTipos = Array<AfastamentoTipo>;