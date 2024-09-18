import { User } from "../users/user";
import { VeiculoPolicial } from "../veiculos-policiais/veiculo-policial";

export interface VeiculoPolicialAlteracao{
    id?: number;
    veiculo_policial: VeiculoPolicial;
    foto: string;
    observacoes?: string;
 
    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type VeiculosPoliciaisAlteracoes = Array<VeiculoPolicialAlteracao>;