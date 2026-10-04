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
import Comment from "@/react/components/Comment";
import { useState } from "react";
import { api } from "@/react/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Suggestion({ suggestion }) {
    const [comment, setComment] = useState("");
    const [expanded, setExpanded] = useState(false);
    const queryClient = useQueryClient();

    const createCommentMutation = useMutation({
        mutationFn: (data) => api.createComment(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
            setComment("");
        },
    });

    function handleAddComment() {
        createCommentMutation.mutate({
            suggestion_id: suggestion?.id,
            message: comment.trim(),
        });
    }

    return (
        <Accordion
            expanded={expanded}
            disableGutters
            style={{ marginBottom: "16px" }}
        >
            <AccordionSummary
                sx={{
                    cursor: "auto",
                    "& .MuiAccordionSummary-content": {
                        alignItems: "flex-start",
                        flexDirection: "column",
                        gap: 1,
                    },
                }}
            >
                <Typography>{suggestion?.title}</Typography>
                <Typography>{suggestion?.description}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            padding: "4px 8px",
                            cursor: "pointer",
                        }}
                        // onClick={handleThumbsUpClick}
                    >
                        {suggestion?.user_vote === 1 ? (
                            <ThumbUpAlt color="success" />
                        ) : (
                            <ThumbUpOffAlt />
                        )}
                        <Typography>{suggestion?.upvotes}</Typography>
                    </div>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            padding: "4px 8px",
                            cursor: "pointer",
                        }}
                    >
                        {suggestion?.user_vote === -1 ? (
                            <ThumbDownAlt color="error" />
                        ) : (
                            <ThumbDownOffAlt />
                        )}
                        <Typography>{suggestion?.downvotes}</Typography>
                    </div>
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "action.hover",
                                borderColor: "text.secondary",
                            },
                        }}
                        onClick={() => setExpanded(!expanded)}
                    >
                        <Chat />
                        <Typography>{suggestion?.comments?.length}</Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <OutlinedInput
                    variant="outlined"
                    multiline
                    fullWidth
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    style={{
                        padding: "4px 8px",
                        marginBottom: "16px",
                    }}
                    endAdornment={
                        <Send
                            color="primary"
                            disabled={true}
                            onClick={() => handleAddComment()}
                        />
                    }
                ></OutlinedInput>

                {suggestion.comments.map((comment, id) => {
                    return <Comment key={id} comment={comment} />;
                })}
            </AccordionDetails>
        </Accordion>
    );
}
