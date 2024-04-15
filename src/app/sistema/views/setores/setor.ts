import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface Setor{
    id?: number;
    nome: string;
    abreviatura?: string;
    telefone?: string;
    email?: string;
    subunidade: Subunidade;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type Setores = Array<Setor>;