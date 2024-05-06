import { Curso } from "../cursos/curso";
import { Policial } from "../policiais/policial";
import { User } from "../users/user";

export interface PolicialCurso{
    id?: number;
    curso: Curso;
    policial: Policial;
    carga_horaria?: number;
    boletim?: string;
    data_inicial: Date;
    data_final: Date;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type PoliciaisCursos = Array<PolicialCurso>;