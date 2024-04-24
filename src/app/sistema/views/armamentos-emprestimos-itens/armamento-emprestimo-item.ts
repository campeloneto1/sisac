import { ArmamentoEmprestimo } from "../armamentos-emprestimos/armamento-emprestimo";
import { Armamento } from "../armamentos/armamento";
import { User } from "../users/user";

export interface ArmamentoEmprestimoItem {
    id?: number;
    armamento_emprestimo: ArmamentoEmprestimo;
    armamento: Armamento;
    quantidade: number;
    quantidade_devolucao?: number;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type ArmamentosEmprestimosItens = Array<ArmamentoEmprestimoItem>;