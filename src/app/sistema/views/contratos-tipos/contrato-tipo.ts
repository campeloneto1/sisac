import { User } from "../users/user";

export interface ContratoTipo{
    id?: number;
    nome: string;
    diarias?: boolean;
    servico?: boolean;
    fatura?: boolean;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type ContratosTipos = Array<ContratoTipo>;