import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    Divider,
    IconButton,
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

const statusColors = {
    under_review: "warning",
    planned: "info",
    implemented: "success",
    declined: "error",
};

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

    const voteMutation = useMutation({
        mutationFn: (vote) => api.setVote(suggestion.id, vote),

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
        },
    });

    function handleAddComment() {
        createCommentMutation.mutate({
            suggestion_id: suggestion?.id,
            message: comment.trim(),
        });
    }

    function handleVote(vote) {
        if (voteMutation.isPending) return;

        voteMutation.mutate(suggestion.user_vote === vote ? 0 : vote);
    }

    function formatEnumName(value) {
        return value
            ?.replace(/_/g, " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    return (
        <Accordion
            expanded={expanded}
            disableGutters
            style={{ marginBottom: "16px" }}
        >
            <AccordionSummary
                sx={{
                    "&.MuiButtonBase-root.MuiAccordionSummary-root": {
                        cursor: "default",
                    },
                    "& .MuiAccordionSummary-content": {
                        alignItems: "flex-start",
                        flexDirection: "column",
                        gap: 1,
                        width: "100%",
                    },
                }}
            >
                <Box sx={{ gap: 0, width: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Typography variant="h6" style={{ marginRight: "8px" }}>
                            {suggestion?.title}
                        </Typography>
                        <Chip
                            label={formatEnumName(suggestion?.status)}
                            color={
                                statusColors[suggestion?.status] ?? "default"
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                            }}
                        >
                            Posted by: {suggestion?.user?.name}
                        </Typography>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        />
                        <Chip
                            label={formatEnumName(suggestion?.category)}
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                </Box>
                <Typography>{suggestion?.description}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "action.hover",
                                borderColor: "text.secondary",
                            },
                        }}
                        onClick={() => handleVote(1)}
                    >
                        {suggestion?.user_vote === 1 ? (
                            <ThumbUpAlt color="success" />
                        ) : (
                            <ThumbUpOffAlt />
                        )}
                        <Typography>{suggestion?.upvotes}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "action.hover",
                                borderColor: "text.secondary",
                            },
                        }}
                        onClick={() => handleVote(-1)}
                    >
                        {suggestion?.user_vote === -1 ? (
                            <ThumbDownAlt color="error" />
                        ) : (
                            <ThumbDownOffAlt />
                        )}

                        <Typography>{suggestion?.downvotes}</Typography>
                    </Box>
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
                        <IconButton
                            color="primary"
                            disabled={
                                !comment.trim() ||
                                createCommentMutation.isPending
                            }
                            onClick={() => handleAddComment()}
                            style={{ cursor: "pointer" }}
                        >
                            <Send />
                        </IconButton>
                    }
                ></OutlinedInput>

                {suggestion.comments.map((comment, id) => {
                    return <Comment key={id} comment={comment} />;
                })}
            </AccordionDetails>
        </Accordion>
    );
}
