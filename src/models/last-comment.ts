import { user } from "./user";

export interface lastComment {
    id?: string;
    message: string;
    createdAt: Date;
    user: user;
}