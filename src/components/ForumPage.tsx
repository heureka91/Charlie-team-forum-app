import React, { useEffect, useState } from "react";
import { Forum } from "../models/forum";
import { Box } from "@chakra-ui/react";
import { ForumList } from "./ForumList";

const ForumPage = () => {
    const [forums, setForums] = useState<Forum[]>([])

    useEffect(() => {
        const getForums = async() => {
            const response = await fetch("http://localhost:5000/forums");
            const forumsJson = await response.json();
            setForums(forumsJson.data.map((forum: any) => ({
                ...forum,
                created_at: new Date(forum.createdAt)
            })))
        }

        getForums();
    }, [])

    return <Box width="full" backgroundColor="Background.light">
        {forums.length > 0 ? <ForumList forums={forums} /> : null}
    </Box>
}

export default ForumPage