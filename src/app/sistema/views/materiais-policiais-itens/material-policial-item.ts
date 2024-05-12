import { MaterialPolicial } from "../materiais-policiais/material-policial";
import { Material } from "../materiais/material";
import { User } from "../users/user";

export interface MaterialPolicialItem {
    id?: number;
    material_policial: MaterialPolicial;
    material: Material;
    quantidade: number;
    quantidade_devolucao?: number;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisPoliciaisItens = Array<MaterialPolicialItem>;