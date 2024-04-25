import { Policial } from "../policiais/policial";
import { User } from "../users/user";


export interface PolicialFerias{
    id?: number;
    policial: Policial;
    ano: number;
    data_inicial: Date;
    data_final: Date;
    dias: number;
    boletim: string;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type PoliciaisFerias = Array<PolicialFerias>;