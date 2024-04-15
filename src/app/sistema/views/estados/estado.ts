import { Pais } from "../paises/pais";
import { User } from "../users/user";

export interface Estado{
    id?: number;
    nome: string;
    abreviatura: string;
    pais: Pais;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type Estados = Array<Estado>;