import { Policial } from "../policiais/policial";
import { User } from "../users/user";


export interface ArmamentoEmprestimo{
    id?: number;
    policial: Policial;
    data_emprestimo: Date;
    data_devolucao?: Date;
    observacoes? : string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type ArmamentosEmprestimos = Array<ArmamentoEmprestimo>;