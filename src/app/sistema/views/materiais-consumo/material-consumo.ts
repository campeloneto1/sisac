import { MateriaisConsumoEntradasItens } from "../materiais-consumo-entradas-itens/material-consumo-entrada-item";
import { MateriaisConsumoSaidasItens } from "../materiais-consumo-saidas-itens/material-consumo-saida-item";
import { MaterialConsumoTipo } from "../materiais-consumo-tipos/material-consumo-tipo";
import { Modelo } from "../modelos/modelo";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface MaterialConsumo{
    id?: number;
    subunidade: Subunidade;
    material_consumo_tipo: MaterialConsumoTipo;
    modelo: Modelo;
    serial?: string;
    data_validade?: Date;
    quantidade: number;
    quantidade_alerta: number;
    materiais_consumo_entradas_itens: MateriaisConsumoEntradasItens;
    materiais_consumo_saidas_itens: MateriaisConsumoSaidasItens;
    
    data_baixa?: Date;
    observacoes?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumo = Array<MaterialConsumo>;