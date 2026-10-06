import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import {
    Chat,
    Edit,
    Send,
    ThumbUpOffAlt,
    ThumbUpAlt,
    ThumbDownOffAlt,
    ThumbDownAlt,
} from "@mui/icons-material";
import Comment from "@/react/components/Comment";
import Modal from "@/react/components/Modal";
import { useState } from "react";
import { api } from "@/react/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const statusColors = {
    under_review: "warning",
    planned: "info",
    implemented: "success",
    declined: "error",
};

export default function Suggestion({ suggestion }) {
    const [comment, setComment] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [status, setStatus] = useState(suggestion?.status || "");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: api.getCurrentUser,
    });

    const createCommentMutation = useMutation({
        mutationFn: (message) => api.createComment(suggestion?.id, message),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
            await queryClient.invalidateQueries({
                queryKey: ["comments", suggestion?.id],
            });
            setComment("");
        },
    });

    const updateSuggestionMutation = useMutation({
        mutationFn: (data) => api.updateSuggestion(suggestion?.id, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["suggestions"],
            });
            handleClose();
        },
    });

    const voteMutation = useMutation({
        mutationFn: (vote) => api.setVote(suggestion?.id, vote),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
        },
    });

    const commentsQuery = useQuery({
        queryKey: ["comments", suggestion?.id],
        queryFn: () => api.getComments(suggestion?.id),
        enabled: expanded && !!suggestion?.id,
    });

    const canEditStatus = Boolean(user?.is_admin);

    function handleAddComment() {
        createCommentMutation.mutate(comment.trim());
    }

    function handleVote(vote) {
        if (voteMutation.isPending) return;

        voteMutation.mutate(suggestion?.user_vote === vote ? 0 : vote);
    }

    function handleEditStatus() {
        updateSuggestionMutation.mutate({
            status,
        });
    }

    function formatEnumName(value) {
        return value
            ?.replace(/_/g, " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    return (
        <>
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
                            <Typography
                                variant="h6"
                                style={{ marginRight: "8px" }}
                            >
                                {suggestion?.title}
                            </Typography>
                            <Chip
                                onClick={canEditStatus ? handleOpen : undefined}
                                label={
                                    <>
                                        <span>
                                            {formatEnumName(suggestion?.status)}
                                        </span>
                                        {canEditStatus && (
                                            <Edit
                                                sx={{
                                                    fontSize: 16,
                                                    cursor: "pointer",
                                                }}
                                            />
                                        )}
                                    </>
                                }
                                color={
                                    statusColors[suggestion?.status] ??
                                    "default"
                                }
                                sx={{
                                    width: 140,
                                    "& .MuiChip-label": {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 0.5,
                                    },
                                }}
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
                                p: "4px 8px",
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
                                p: "4px 8px",
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
                                p: "4px 8px",
                                cursor: "pointer",
                                color: expanded ? "primary.main" : "black",
                                "&:hover": {
                                    backgroundColor: "action.hover",
                                    borderColor: "text.secondary",
                                },
                            }}
                            onClick={() => setExpanded(!expanded)}
                        >
                            <Chat />
                            <Typography>
                                {suggestion?.comments_count}
                            </Typography>
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

                    {commentsQuery.data?.map((comment, id) => {
                        return <Comment key={id} comment={comment} />;
                    })}
                </AccordionDetails>
            </Accordion>
            <Modal open={open} onClose={handleClose} title="Update Status">
                <TextField
                    label="Status"
                    value={status}
                    select
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="under_review">Under Review</MenuItem>
                    <MenuItem value="planned">Planned</MenuItem>
                    <MenuItem value="implemented">Implemented</MenuItem>
                    <MenuItem value="declined">Declined</MenuItem>
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditStatus}
                    disabled={updateSuggestionMutation.isPending}
                >
                    Update
                </Button>
            </Modal>
        </>
    );
}
