import { MateriaisConsumoSaidasItens } from "../materiais-consumo-saidas-itens/material-consumo-saida-item";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface MaterialConsumoSaida{
    id?: number;
    subunidade: Subunidade;
    user: User;
    data_saida: Date;
    observacoes? : string;
    materiais_consumo_saidas_itens: MateriaisConsumoSaidasItens;
    materiais_consumo?: any;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumoSaidas = Array<MaterialConsumoSaida>;