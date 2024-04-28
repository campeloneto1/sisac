import { ManutencaoTipo } from "../manutencoes-tipos/manutencao-tipo";
import { Oficina } from "../oficinas/oficina";
import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";
import { Veiculo } from "../veiculos/veiculo";

export interface VeiculoOficina{
    id?: number;
    veiculo: Veiculo;
    oficina: Oficina;
    manutencao_tipo: ManutencaoTipo;
    data_inicial: Date;
    data_final: Date;
    km_inicial?:number;
    km_final?: number;
    observacoes: string;

    subunidade: Subunidade;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type VeiculosOficinas = Array<VeiculoOficina>;