import { Cidade } from "../cidades/cidade";
import { User } from "../users/user";

export interface Unidade{
    id?: number;
    nome: string;
    abreviatura: string;
    telefone?: string;
    email?: string;

    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: Cidade;
    cep?: string;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type Unidades = Array<Unidade>;