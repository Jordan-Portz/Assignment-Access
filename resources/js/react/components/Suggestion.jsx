import {
    Chat,
    Edit,
    Send,
    ThumbDownAlt,
    ThumbDownOffAlt,
    ThumbUpAlt,
    ThumbUpOffAlt,
} from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    CircularProgress,
    Divider,
    IconButton,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Comment from "@/react/components/Comment";
import LoadingButton from "@/react/components/LoadingButton";
import Modal from "@/react/components/Modal";
import { api } from "@/react/lib/api";
import {
    suggestionStatuses,
    suggestionCategories,
} from "@/react/lib/suggestionOptions";

export default function Suggestion({ suggestion }) {
    const [comment, setComment] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [status, setStatus] = useState(suggestion?.status || "");
    const [pendingVote, setPendingVote] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
        onSettled: () => {
            setPendingVote(null);
        },
    });

    const {
        data: comments,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["comments", suggestion?.id],
        queryFn: () => api.getComments(suggestion?.id),
        enabled: expanded && !!suggestion?.id,
    });

    function handleAddComment() {
        createCommentMutation.mutate(comment.trim());
    }

    function handleVote(vote) {
        if (voteMutation.isPending) return;

        setPendingVote(vote);
        voteMutation.mutate(suggestion?.user_vote === vote ? 0 : vote);
    }

    function handleEditStatus() {
        updateSuggestionMutation.mutate({
            status,
        });
    }

    const canEditStatus = Boolean(user?.is_admin);

    const currentStatus = suggestionStatuses.find(
        (option) => option.value === suggestion?.status,
    );

    const currentCategory = suggestionCategories.find(
        (option) => option.value === suggestion?.category,
    );

    const interactionControlStyles = {
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "16px",
        p: "4px 8px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "action.hover",
            borderColor: "text.secondary",
        },
    };

    return (
        <>
            <Accordion expanded={expanded} disableGutters sx={{ mb: "16px" }}>
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
                            <Typography variant="h6" sx={{ mr: "8px" }}>
                                {suggestion?.title}
                            </Typography>
                            <Chip
                                onClick={canEditStatus ? handleOpen : undefined}
                                label={
                                    <>
                                        <span>{currentStatus?.label}</span>
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
                                color={currentStatus?.color ?? "default"}
                                sx={{
                                    width: 140,
                                    "& .MuiChip-label": {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
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
                                sx={{
                                    fontSize: 12,
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
                                label={currentCategory?.label}
                                size="small"
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                    <Typography>{suggestion?.description}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                            sx={{ ...interactionControlStyles }}
                            onClick={() => handleVote(1)}
                        >
                            {voteMutation.isPending && pendingVote === 1 ? (
                                <CircularProgress size="24px" />
                            ) : suggestion?.user_vote === 1 ? (
                                <ThumbUpAlt color="success" />
                            ) : (
                                <ThumbUpOffAlt />
                            )}

                            <Typography>{suggestion?.upvotes}</Typography>
                        </Box>
                        <Box
                            sx={{ ...interactionControlStyles }}
                            onClick={() => handleVote(-1)}
                        >
                            {voteMutation.isPending && pendingVote === -1 ? (
                                <CircularProgress size="24px" />
                            ) : suggestion?.user_vote === -1 ? (
                                <ThumbDownAlt color="error" />
                            ) : (
                                <ThumbDownOffAlt />
                            )}

                            <Typography>{suggestion?.downvotes}</Typography>
                        </Box>
                        <Box
                            sx={{
                                ...interactionControlStyles,
                                color: expanded ? "primary.main" : "black",
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
                        sx={{
                            p: "4px 8px",
                            mb: "16px",
                        }}
                        endAdornment={
                            <IconButton
                                color="primary"
                                disabled={
                                    !comment.trim() ||
                                    createCommentMutation.isPending
                                }
                                onClick={handleAddComment}
                                sx={{ cursor: "pointer" }}
                            >
                                {createCommentMutation.isPending ? (
                                    <CircularProgress size="24px" />
                                ) : (
                                    <Send />
                                )}
                            </IconButton>
                        }
                    />
                    {isPending ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                            }}
                        >
                            <CircularProgress size="24px" />
                            <Typography variant="body1">Loading...</Typography>
                        </Box>
                    ) : isError ? (
                        <Typography color="error" sx={{ pt: 4 }}>
                            Failed to load suggestions.
                        </Typography>
                    ) : (
                        comments?.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                    )}
                </AccordionDetails>
            </Accordion>
            <Modal open={open} onClose={handleClose} title="Update Status">
                <TextField
                    label="Status"
                    value={status}
                    select
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {suggestionStatuses?.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </TextField>
                <LoadingButton
                    isLoading={updateSuggestionMutation.isPending}
                    onClick={handleEditStatus}
                    label="Update"
                />
            </Modal>
        </>
    );
}
