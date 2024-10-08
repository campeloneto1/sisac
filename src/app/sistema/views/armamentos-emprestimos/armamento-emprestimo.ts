import { ArmamentosEmprestimosItens } from "../armamentos-emprestimos-itens/armamento-emprestimo-item";
import { Policial } from "../policiais/policial";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";


export interface ArmamentoEmprestimo{
    id?: number;
    policial: Policial;
    data_emprestimo: Date;
    assinatura_emprestimo?: string;
    data_devolucao?: Date;
    assinatura_devolucao?: string;
    observacoes? : string;
    cautela?: boolean;
    armamentos_emprestimos_itens: ArmamentosEmprestimosItens;
    armamentos: any;
    subunidade: Subunidade;
    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type ArmamentosEmprestimos = Array<ArmamentoEmprestimo>;