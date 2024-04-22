import { User } from "../users/user";


export interface Marca{
    id?: number;
    nome: string;
    abreviatura?: string;
    armamento?: boolean;
    logistica?: boolean;
    transporte?: boolean;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Marcas = Array<Marca>;