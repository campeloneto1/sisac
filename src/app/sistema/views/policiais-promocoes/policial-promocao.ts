import { Graduacao } from "../graduacoes/graduacao";
import { Policial } from "../policiais/policial";
import { User } from "../users/user";

export interface PolicialPromocao {
    id?: number;
    policial: Policial;
    graduacao: Graduacao;
    data_promocao: Date;
    boletim: string;
    observacoes: string;
    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
  }
  
  export type PoliciaisPromocoes = Array<PolicialPromocao>;
  