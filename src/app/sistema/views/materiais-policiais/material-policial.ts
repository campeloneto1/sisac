import { MateriaisPoliciaisItens } from "../materiais-policiais-itens/material-policial-item";
import { Policial } from "../policiais/policial";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface MaterialPolicial{
    id?: number;
    policial: Policial;
    data_emprestimo: Date;
    data_devolucao?: Date;
    observacoes? : string;
    cautela?: boolean;
    materiais?: any;
    materiais_policiais_itens: MateriaisPoliciaisItens; 
    subunidade: Subunidade;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type MateriaisPoliciais = Array<MaterialPolicial>;