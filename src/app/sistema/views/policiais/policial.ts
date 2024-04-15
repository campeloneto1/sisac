import { Cidade } from "../cidades/cidade";
import { Graduacao } from "../graduacoes/graduacao";
import { Setor } from "../setores/setor";
import { Sexo } from "../sexos/sexo";
import { User } from "../users/user";

export interface Policial{
    id?: number;
    nome: string;
    numeral?: string;
    nome_guerra: string;
    matricula: string;
    cpf: string;
    email?: string;
    telefone1?: string;
    telefone2?: string;
    data_nascimento?: Date;

    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: Cidade;
    cep?: string;

    data_ingresso?: Date;
    boletim_inclusao?: string;
    data_apresentacao?: Date;
    boletim_apresentacao?: string;
    boletim_transferencia?: string;

    sexo?: Sexo;
    graduacao: Graduacao;
    setor: Setor;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;

}

export type Policiais = Array<Policial>;