import { Perfil } from "../perfis/perfil";
import { Policial } from "../policiais/policial";
import { Subunidade } from "../subunidades/subunidade";

export interface User{
    id?: number;
    nome: string;
    telefone?: string;
    email?: string;
    cpf: string;
    password: string;
    salt: string;
    perfil: Perfil;
    subunidade: Subunidade;

    policial?: Policial;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type Users = Array<User>;