import { ArmamentosEmprestimos } from "../armamentos-emprestimos/armamento-emprestimo";
import { Banco } from "../bancos/banco";
import { Cidade } from "../cidades/cidade";
import { Escolaridade } from "../escolaridades/escolaridade";
import { Funcao } from "../funcoes/funcao";
import { Graduacao } from "../graduacoes/graduacao";
import { MateriaisPoliciais } from "../materiais-policiais/material-policial";
import { PoliciaisAtestados } from "../policiais-atestados/policial-atestado";
import { PoliciaisCursos } from "../policiais-cursos/policial-curso";
import { PoliciaisFerias } from "../policiais-ferias/policial-ferias";
import { PoliciaisPublicacoes } from "../policiais-publicacoes/policial-publicacao";
import { Setor } from "../setores/setor";
import { Sexo } from "../sexos/sexo";
import { User } from "../users/user";
import { VeiculosPoliciais } from "../veiculos-policiais/veiculo-policial";

export interface Policial{
    id?: number;
    nome: string;
    numeral?: string;
    nome_guerra: string;
    matricula: string;
    matricula_cc: string;
    cpf: string;
    email?: string;
    telefone1?: string;
    telefone2?: string;
    data_nascimento?: Date;
    user?: User;

    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: Cidade;
    cep?: string;

    foto?: string;

    data_inclusao?: Date;
    boletim_inclusao?: string;
    data_apresentacao?: Date;
    boletim_apresentacao?: string;
    boletim_transferencia?: string;

    sexo: Sexo;
    graduacao: Graduacao;
    setor: Setor;
    escolaridade: Escolaridade;
    funcao: Funcao;
    policiais_atestados: PoliciaisAtestados;
    policiais_ferias: PoliciaisFerias;
    policiais_publicacoes: PoliciaisPublicacoes;
    armamentos_emprestimos: ArmamentosEmprestimos;
    veiculos_policiais: VeiculosPoliciais;
    policiais_cursos: PoliciaisCursos;
    materiais_policiais: MateriaisPoliciais;

    usuario?: User;

    banco?: Banco;
    agencia?: string;
    conta?: string;

    pai?: string;
    mae?: string;

    created_by?: User;
    updated_by?: User;
    created_at?: Date;
    updated_at?: Date;

}

export type Policiais = Array<Policial>;