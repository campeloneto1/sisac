import { User } from "../users/user";

export interface DiariaStatus {
    id?: number;
    nome: string;
    cadastrado: boolean;
    em_andamento: boolean;
    concluido: boolean;
  
    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export type DiariasStatus = Array<DiariaStatus>;