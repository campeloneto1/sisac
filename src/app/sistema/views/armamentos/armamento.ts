import { ArmamentoCalibre } from "../armamentos-calibres/armamento-calibre";
import { ArmamentosEmprestimosItens } from "../armamentos-emprestimos-itens/armamento-emprestimo-item";
import { ArmamentoTamanho } from "../armamentos-tamanhos/armamento-tamanho";
import { ArmamentoTipo } from "../armamentos-tipos/armamento-tipo";
import { Modelo } from "../modelos/modelo";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface Armamento{
    id?: number;
    subunidade: Subunidade;
    serial: string;
    modelo: Modelo;
    armamento_tipo: ArmamentoTipo;
    armamento_calibre?: ArmamentoCalibre;
    armamento_tamanho?: ArmamentoTamanho;
    data_validade?: Date;
    quantidade: number;
    quantidade_disponivel: number;
    
    data_baixa?: Date;
    observacoes?: string;

    armamentos_emprestimos_itens: ArmamentosEmprestimosItens;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;
}

export type Armamentos = Array<Armamento>;