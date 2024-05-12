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
    
    data_baixa?: Date;
    observacoes?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisConsumo = Array<MaterialConsumo>;