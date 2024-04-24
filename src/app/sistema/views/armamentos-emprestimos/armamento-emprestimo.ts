import { ArmamentosEmprestimosItens } from "../armamentos-emprestimos-itens/armamento-emprestimo-item";
import { Policial } from "../policiais/policial";
import { User } from "../users/user";


export interface ArmamentoEmprestimo{
    id?: number;
    policial: Policial;
    data_emprestimo: Date;
    data_devolucao?: Date;
    observacoes? : string;
    armamentos_emprestimos_itens: ArmamentosEmprestimosItens;
    armamentos: any;
    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type ArmamentosEmprestimos = Array<ArmamentoEmprestimo>;