import { Subunidade } from "../subunidades/subunidade";
import { User } from "../users/user";

export interface UserSubunidade{
    id?: number;
    user: User;
    subunidade: Subunidade

    created_by: User;
    updated_by: User;
    created_at: Date;
    updated_at: Date;
}

export type UsersSubunidades = Array<UserSubunidade>;