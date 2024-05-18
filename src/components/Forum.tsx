import { Flex, Text, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react"
import React from "react"
import { forum } from "../models/forum-props"

interface ForumProps {
    forum: forum;
}

export const Forum: React.FC<ForumProps> = ({ forum }) => {
    return <LinkBox>
        <Flex justifyContent="space-between" opacity={0.5}>
            <LinkOverlay href={`/forum/${forum.id}`}>
                <Heading as="header" flexGrow={1} gap={1} display="flex" flexDirection="row">
                    <Text as="h4" fontSize="lg" fontWeight="medium">
                        {forum.title}
                    </Text>
                    <Text fontSize="medium">
                        {forum.description}
                    </Text>
                    <Text>
                        {forum.createdBy}
                    </Text>
                </Heading>
            </LinkOverlay>
        </Flex>
    </LinkBox>
}