import { ContratoObjeto } from "../contratos-objetos/contrato-objeto";
import { ContratoTipo } from "../contratos-tipos/contrato-tipo";
import { Empresa } from "../empresas/empresa";
import { Policial } from "../policiais/policial";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface Contrato{
    id?: number;
    subunidade: Subunidade;
    empresa: Empresa;
    numero_contrato: string;
    numero_sacc: string;
    valor_global: number;
    valor_usado: number;
    data_inicial: Date;
    data_final: Date;
    prorrogavel?: boolean;

    contrato_tipo: ContratoTipo;
    contrato_objeto: ContratoObjeto;

    gestor: Policial;
    fiscal: Policial;

    observacoes?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Contratos = Array<Contrato>;