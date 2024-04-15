import { User } from "../users/user";

export interface Perfil{
    id?: number;
    nome: string;
    administrador?: boolean;
    gestor?: boolean;
    relatorios?: boolean;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type Perfis = Array<Perfil>;