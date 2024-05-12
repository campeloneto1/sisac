import { MaterialConsumoEntrada } from "../materiais-consumo-entradas/material-consumo-entrada";
import { MaterialConsumo } from "../materiais-consumo/material-consumo";
import { User } from "../users/user";

export interface MaterialConsumoEntradaItem {
    id?: number;
    material_consumo_entrada: MaterialConsumoEntrada;
    material_consumo: MaterialConsumo;
    quantidade: number;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumoEntradasItens = Array<MaterialConsumoEntradaItem>;