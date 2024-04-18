import { Policial } from "../policiais/policial";
import { PublicacaoTipo } from "../publicacoes-tipos/publicacao-tipo";
import { User } from "../users/user";


export interface PolicialPublicacao{
    id?: number;
    policial: Policial;
    publicacao_tipo: PublicacaoTipo;
    texto: string;
    boletim?: string;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type PoliciaisPublicacoes = Array<PolicialPublicacao>;