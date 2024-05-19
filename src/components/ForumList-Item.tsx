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
                <Heading as="header" flexGrow={1} gap={3} display="flex" flexDirection="row">
                    <Text as="h4" fontSize="lg">
                        {forum.title}
                    </Text>
                    <Text fontSize="md" fontWeight="medium">
                        {forum.description}
                    </Text>
                    <Text as="h4" fontSize="md" fontWeight="medium">
                        Fórum készítője:
                    </Text>
                    <Text fontSize="md">
                        {forum.createdBy.firstName} {forum.createdBy.lastName}
                    </Text>
                    <Text fontSize="md" fontWeight="medium">
                        Utolsó komment időpontja:
                    </Text>
                    <Text fontSize="md">
                        {forum.lastComment.createdAt.getUTCDate()}
                    </Text>
                    <Text fontSize="md" fontWeight="medium">
                        Utolsó kommentet létrehozta:
                    </Text>
                    <Text fontSize="md" >
                        {forum.lastComment.user.firstName} {forum.lastComment.user.lastName}
                    </Text>
                    <Text fontSize="md" fontWeight="medium">
                        Kommentek száma:
                    </Text>
                    <Text fontSize="md">
                        {forum.commentsCount}
                    </Text>
                </Heading>
            </LinkOverlay>
        </Flex>
    </LinkBox>
}