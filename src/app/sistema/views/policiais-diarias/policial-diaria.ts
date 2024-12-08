import { Cidade } from "../cidades/cidade";
import { DiariaStatus } from "../diarias-status/diaria-status";
import { DiariaTipo } from "../diarias-tipos/diaria-tipo";
import { Policial } from "../policiais/policial";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface PolicialDiaria {
    id?: number;
    subunidade: Subunidade;
    policial: Policial;
    data_inicial: Date;
    data_final?: Date;
    cidade: Cidade;
    quant_diarias?: number;
    valor?: number;
    acrescimo?: number;
    ajuda_custo?: number;
    valor_total?: number;
    observacoes?: string;
    doe?: string;
    nup?: string;
    diaria_status: DiariaStatus;
    diaria_tipo: DiariaTipo;
    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
  }
  
  export type PoliciaisDiarias = Array<PolicialDiaria>;
  