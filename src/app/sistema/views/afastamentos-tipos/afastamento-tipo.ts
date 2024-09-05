import { User } from "../users/user";

export interface AfastamentoTipo{
    id?: number;
    nome: string;
    atestado?: boolean;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type AfastamentosTipos = Array<AfastamentoTipo>;