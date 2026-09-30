import { Box, Card, CardContent, Typography } from "@mui/material";
import {
    Chat,
    ThumbUpOffAlt,
    ThumbUpAlt,
    ThumbDownOffAlt,
    ThumbDownAlt,
} from "@mui/icons-material";
import { useState, useEffect } from "react";

export default function Suggestion({ title, description }) {
    const [vote, setVote] = useState(0);
    const [voteCount, setVoteCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    function handleThumbsUpClick() {
        setVote(vote === 1 ? 0 : 1);
    }

    function handleThumbsDownClick() {
        setVote(vote === -1 ? 0 : -1);
    }

    return (
        <Box style={{ marginBottom: "16px" }}>
            <Card>
                <CardContent>
                    <Typography>{title}</Typography>
                    <Typography>{description}</Typography>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            padding: "4px 8px",
                        }}
                    >
                        <div
                            onClick={handleThumbsUpClick}
                            style={{ cursor: "pointer" }}
                        >
                            {vote === 1 ? (
                                <ThumbUpAlt color="success" />
                            ) : (
                                <ThumbUpOffAlt />
                            )}
                        </div>
                        <Typography>{voteCount}</Typography>
                        <div
                            onClick={handleThumbsDownClick}
                            style={{ cursor: "pointer" }}
                        >
                            {vote === -1 ? (
                                <ThumbDownAlt color="error" />
                            ) : (
                                <ThumbDownOffAlt />
                            )}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            padding: "4px 8px",
                        }}
                    >
                        <Chat />
                        <Typography>{commentCount}</Typography>
                    </div>
                </CardContent>
            </Card>
        </Box>
    );
}
