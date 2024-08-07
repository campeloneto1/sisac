import { ContratosLancamentos } from "../contratos-lancamentos/contrato-lancamento";
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
    objeto: string;
    contrato_tipo: ContratoTipo;
    contrato_objeto: ContratoObjeto;

    gestor: Policial;
    fiscal: Policial;

    quantidade_diarias?: number;
    numero_porrogacao?: number;
    contrato_prorrogado?: Contrato;
    porcentagem_aditivado?: number;
    data_aditivado?:Date;
    observacoes_aditivado?: string;

    observacoes?: string;

    contratos_lancamentos: ContratosLancamentos;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Contratos = Array<Contrato>;