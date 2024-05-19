import { Heading, Link, Text } from "@chakra-ui/react";
import React, { FC } from "react";

export const PageTitle: FC = () => {
    return <Link
        href="/"
        _hover={{
            textDecoration: "none"
        }}
    >
        <Heading fontSize="xl" color="text.highlighted">
            <Text as="span" fontWeight="black">Fórum</Text>
        </Heading>
    </Link>
}