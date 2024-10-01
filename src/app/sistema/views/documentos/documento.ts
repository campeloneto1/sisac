import { DocumentoTipo } from "../documentos-tipos/documento-tipo";
import { Setor } from "../setores/setor";
import { User } from "../users/user";

export interface Documento{
    id?: number;
    codigo: number;
    titulo: string;
    texto: string;
    documento_tipo: DocumentoTipo;
    setor: Setor;

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type Documentos = Array<Documento>;