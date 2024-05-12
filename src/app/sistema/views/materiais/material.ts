import { MateriaisPoliciaisItens } from "../materiais-policiais-itens/material-policial-item";
import { MaterialTipo } from "../materiais-tipos/material-tipo";
import { Modelo } from "../modelos/modelo";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface Material{
    id?: number;
    subunidade: Subunidade;
    material_tipo: MaterialTipo;
    modelo: Modelo;
    serial?: string;
    data_validade?: Date;
    quantidade: number;
    quantidade_disponivel: number;
    materiais_policiais_itens: MateriaisPoliciaisItens;

    data_baixa?: Date;
    observacoes?: string;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Materiais = Array<Material>;