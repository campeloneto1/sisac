import { Cidade } from "../cidades/cidade";
import { Contratos } from "../contratos/contrato";
import { Servicos } from "../servicos/servico";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface Empresa{
    id?: number;
    subunidade: Subunidade;
    nome: string;
    nome_fantasia?: string;
    cnpj: string;
    telefone1?: string;
    telefone2?: string;
    email?: string;
    gerente?: string;
    
    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: Cidade;
    cep?: string;

    contratos: Contratos;
    servicos: Servicos;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;

}

export type Empresas = Array<Empresa>;