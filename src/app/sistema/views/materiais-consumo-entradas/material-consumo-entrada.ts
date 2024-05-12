import { MateriaisConsumoEntradasItens } from "../materiais-consumo-entradas-itens/material-consumo-entrada-item";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface MaterialConsumoEntrada{
    id?: number;
    subunidade: Subunidade;
    user: User;
    data_entrada: Date;
    observacoes? : string;
    materiais_consumo_entradas_itens: MateriaisConsumoEntradasItens;
    materiais?: any;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumoEntradas = Array<MaterialConsumoEntrada>;