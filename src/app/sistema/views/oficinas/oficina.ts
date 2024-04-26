import { Cidade } from "../cidades/cidade";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface Oficina{
    id?: number;
    nome: string;

    gerente?: string;
    telefone1?: string;
    telefone2?: string;
    email?: string;

    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: Cidade;
    cep?: string;

    subunidade: Subunidade;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Oficinas = Array<Oficina>;