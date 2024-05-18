import { createdBy } from "./created-by";
import { lastComment } from "./last-comment";

export interface forum {
    id?: string;
    title: string;
    description: string;
    createdAt: Date;
    createdBy: createdBy[];
    commentsCount: number;
    lastComment: lastComment[];
}