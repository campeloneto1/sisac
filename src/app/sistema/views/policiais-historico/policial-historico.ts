import { Policial } from "../policiais/policial";
import { Setor } from "../setores/setor";
import { User } from "../users/user";

export interface PolicialHistorico {
    id?: number;
    policial: Policial;
    setor_origem: Setor;
    setor_destino: Setor;
    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export type PoliciaisHistoricos = Array<PolicialHistorico>;
  