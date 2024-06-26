import { Cor } from "../cores/cor";
import { Modelo } from "../modelos/modelo";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";
import { VeiculosOficinas } from "../veiculos-oficinas/veiculo-oficina";
import { VeiculosPoliciais } from "../veiculos-policiais/veiculo-policial";
import { VeiculoTipo } from "../veiculos-tipos/veiculo-tipo";

export interface Veiculo{
    id?: number;
    placa: string;
    placa_especial?: string;
    renavam?: string;
    chassi?: string;
    ano?: number;
    blindado?: boolean;
    organico?: boolean;
    data_baixa?: Date;

    km_inicial: number;
    km_atual:number;
    km_troca_oleo?: number;
    km_revisao?: number;
    data_revisao?: Date;

    veiculo_tipo: VeiculoTipo;
    modelo: Modelo;
    cor: Cor;
    subunidade: Subunidade;

    observacoes?: string;

    nao_disponivel?: boolean;

    veiculos_policiais: VeiculosPoliciais;
    veiculos_oficinas: VeiculosOficinas;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Veiculos = Array<Veiculo>;