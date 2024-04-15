import { Estado } from "../estados/estado";
import { User } from "../users/user";

export interface Cidade{
    id?: number;
    nome: string;
    abreviatura: string;
    estado: Estado;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type Cidades = Array<Cidade>;