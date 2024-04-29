import { PatrimonioTipo } from "../patrimonios-tipos/patrimonio-tipo";
import { Setor } from "../setores/setor";
import { User } from "../users/user";

export interface Patrimonio{
    id?: number;
    setor: Setor;
    patrimonio_tipo: PatrimonioTipo;
    nome?: string;
    serial?: string;
    tombo: string;
    data_baixa?: Date;
    observacoes?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Patrimonios = Array<Patrimonio>;