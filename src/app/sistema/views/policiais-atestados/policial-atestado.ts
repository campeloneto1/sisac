import { AfastamentoTipo } from "../afastamentos-tipos/afastamento-tipo";
import { Policial } from "../policiais/policial";
import { User } from "../users/user";

export interface PolicialAtestado{
    id?: number;
    policial: Policial;
    data_inicial: Date;
    data_final: Date;
    dias: number;
    cid?: string;
    hospital?: string;
    crm?: string;
    afastamento_tipo: AfastamentoTipo;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type PoliciaisAtestados = Array<PolicialAtestado>;