import { Empresa } from "../empresas/empresa";
import { ServicoTipo } from "../servicos-tipos/servico-tipo";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface Servico{
    id?: number;
    subunidade: Subunidade;
    empresa: Empresa;
    servico_tipo: ServicoTipo;
    data_inicial: Date;
    data_final?: Date;
    observacoes: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Servicos = Array<Servico>;