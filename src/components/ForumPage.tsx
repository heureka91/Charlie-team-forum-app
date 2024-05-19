import React, { useEffect, useState } from "react";
import { Forum } from "../models/forum";
import { Box } from "@chakra-ui/react";
import { ForumList } from "./ForumList";

const ForumPage = () => {
    const [forums, setForums] = useState<Forum[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getForums = async () => {
            try {
                const response = await fetch("http://localhost:5000/forum");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
                }
                const forumsJson = await response.json();
                console.log('Fetched data:', forumsJson); // Naplózás hozzáadása
                setForums(forumsJson.map((forum: any) => ({
                    ...forum,
                    created_at: new Date(forum.createdAt),
                    lastComment: forum.lastComment ? {
                        ...forum.lastComment,
                        createdAt: new Date(forum.lastComment.createdAt)
                    } : null
                })));
            } catch (err: any) {
                setError(err.message);
            }
        };

        getForums();
    }, []);

    return (
        <Box width="full" backgroundColor="Background.light">
            {error && <p>Error: {error}</p>}
            {forums.length > 0 ? <ForumList forums={forums} /> : <p>Loading...</p>}
        </Box>
    );
};

export default ForumPage;
