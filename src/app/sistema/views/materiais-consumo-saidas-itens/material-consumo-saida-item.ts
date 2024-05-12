import { MaterialConsumoSaida } from "../materiais-consumo-saidas/material-consumo-saida";
import { MaterialConsumo } from "../materiais-consumo/material-consumo";
import { User } from "../users/user";

export interface MaterialConsumoSaidaItem {
    id?: number;
    material_consumo_saida: MaterialConsumoSaida;
    material_consumo: MaterialConsumo;
    quantidade: number;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumoSaidasItens = Array<MaterialConsumoSaidaItem>;