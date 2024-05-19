import { Flex, Text, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react"
import React, { FC } from "react"
import { Forum } from "../models/forum";

interface ForumProps {
    forum: Forum;
}

export const ForumListItem: FC<ForumProps> = ({ forum }) => {
    return <LinkBox>
        <Flex justifyContent="space-between" opacity={0.85}>
            <LinkOverlay href={`/forum/${forum.id}`}>
                <Heading as="header" flexGrow={1} gap={1} display="flex" flexDirection="row">
                    <Text as="h4" fontSize="lg" fontWeight="medium">
                        {forum.title}
                    </Text>
                    <Text fontSize="md">
                        {forum.description}
                    </Text>
                    <Text fontSize="md">
                        Fórum készítője: {forum.createdBy.firstName} {forum.createdBy.lastName}
                    </Text>
                    <Text fontSize="sm">
                        Utolsó komment időpontja: {forum.lastComment.createdAt.getUTCDate()}
                    </Text>
                    <Text fontSize="md">
                        Utolsó kommentet létrehozta: {forum.lastComment.user.firstName} {forum.lastComment.user.lastName}
                    </Text>
                    <Text fontSize="sm">
                        Kommentek száma: {forum.commentsCount}
                    </Text>
                </Heading>
            </LinkOverlay>
        </Flex>
    </LinkBox>
}