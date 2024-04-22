import { Marca } from "../marcas/marca";
import { User } from "../users/user";

export interface Modelo{
    id?: number;
    nome: string;
    abreviatura?: string;
    marca: Marca;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Modelos = Array<Modelo>;