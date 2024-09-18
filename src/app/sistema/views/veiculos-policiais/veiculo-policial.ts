import { Cidade } from "../cidades/cidade";
import { Policial } from "../policiais/policial";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";
import { VeiculosPoliciaisAlteracoes } from "../veiculos-policiais-alteracoes/veiculo-policial-alteracao";
import { Veiculo } from "../veiculos/veiculo";

export interface VeiculoPolicial{
    id?: number;
    policial: Policial;
    veiculo: Veiculo;
    km_inicial: number;
    km_final?: number;
    data_inicial: Date;
    data_final?: Date;
    observacoes?: string;
    cidade: Cidade;
    subunidade: Subunidade;
    veiculos_policiais_alteracoes?: VeiculosPoliciaisAlteracoes;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type VeiculosPoliciais = Array<VeiculoPolicial>;