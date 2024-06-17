import { Contrato } from "../contratos/contrato";
import { User } from "../users/user";

export interface ContratoLancamento{
    id?: number;
    contrato: Contrato;
    mes_referencia: Date;
    valor: number;

    observacoes?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type ContratosLancamentos = Array<ContratoLancamento>;