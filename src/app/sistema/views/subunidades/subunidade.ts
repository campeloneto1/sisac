import { Cidade } from "../cidades/cidade";
import { Policial } from "../policiais/policial";
import { Unidade } from "../unidades/unidade";
import { User } from "../users/user";

export interface Subunidade{
    id?: number;
    nome: string;
    abreviatura: string;
    telefone?: string;
    email?: string;
    unidade: Unidade;

    comandante: Policial;
    subcomandante: Policial;


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

export type Subunidades = Array<Subunidade>;