import { createdBy } from "./created-by";
import { lastComment } from "./last-comment";

export interface Forum {
    commentsNumber: number;
    comments: lastComment;
    id?: string;
    createdBy: createdBy;
    createdAt: Date;
    title: string;
    description: string;
}