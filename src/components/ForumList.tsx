import React, { FC } from "react";
import { Forum } from "../models/forum";
import { Grid, GridItem } from "@chakra-ui/react";
import { ForumListItem } from "./ForumList-Item";

interface ForumListProps {
    forums: Forum[];
}

export const ForumList: FC<ForumListProps> = ({ forums }) => {
    return <Grid sx={{
        gridTemplateColums: "repeat(1, 1fr)",
        gap: 10
    }}>
        {forums.map((forumItem: Forum) => {
            return <GridItem key={forumItem.id}>
                <ForumListItem forum={forumItem} />
            </GridItem>
        })}
    </Grid>
}