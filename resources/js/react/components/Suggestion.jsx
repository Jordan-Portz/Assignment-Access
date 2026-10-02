import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    OutlinedInput,
    Typography,
} from "@mui/material";
import {
    Chat,
    Send,
    ThumbUpOffAlt,
    ThumbUpAlt,
    ThumbDownOffAlt,
    ThumbDownAlt,
} from "@mui/icons-material";
import { useState } from "react";
import { api } from "@/react/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Suggestion({ suggestion }) {
    const [vote, setVote] = useState(0);
    const [voteCount, setVoteCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();

    const createCommentMutation = useMutation({
        mutationFn: ({ suggestion_id, data }) =>
            api.createComment(suggestion_id, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
    });

    function handleThumbsUpClick() {
        setVote(vote === 1 ? 0 : 1);
    }

    function handleThumbsDownClick() {
        setVote(vote === -1 ? 0 : -1);
    }

    function handleAddComment() {
        createCommentMutation.mutate({
            suggestion_id: suggestion.id,
            data: {
                message: comment.trim(),
            },
        });
    }

    return (
        <Accordion>
            <AccordionSummary
                sx={{
                    "& .MuiAccordionSummary-content": {
                        alignItems: "flex-start",
                        flexDirection: "column",
                        gap: 1,
                    },
                }}
            >
                <Typography>{suggestion.title}</Typography>
                <Typography>{suggestion.description}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <OutlinedInput
                        variant="outlined"
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        endAdornment={
                            <Send
                                color="primary"
                                disabled={true}
                                onClick={() => handleAddComment()}
                            />
                        }
                    ></OutlinedInput>
                </div>

                {suggestion.comments.map((comment, id) => {
                    return <p key={id}>{comment.message}</p>;
                })}
            </AccordionDetails>
        </Accordion>
    );
}
