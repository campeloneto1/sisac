import { User } from "../users/user";

export interface MaterialConsumoTipo{
    id?: number;
    nome: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumoTipos = Array<MaterialConsumoTipo>;