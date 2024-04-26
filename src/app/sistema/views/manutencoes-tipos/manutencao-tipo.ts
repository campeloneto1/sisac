import { User } from "../users/user";

export interface ManutencaoTipo{
    id?: number;
    nome: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type ManutencoesTipos = Array<ManutencaoTipo>;