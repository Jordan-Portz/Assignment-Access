import {
    Box,
    Button,
    CircularProgress,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/react/lib/api";
import Suggestion from "@/react/components/Suggestion";
import Modal from "@/react/components/Modal";
import LoadingButton from "@/react/components/LoadingButton";
import { useState } from "react";

export default function SuggestionBoard() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        clearModal();
    };
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [titleTouched, setTitleTouched] = useState(false);
    const [descriptionTouched, setDescriptionTouched] = useState(false);
    const [categoryTouched, setCategoryTouched] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const queryClient = useQueryClient();

    const createSuggestionMutation = useMutation({
        mutationFn: api.createSuggestion,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["suggestions"] });
            handleClose();
        },
    });

    const {
        data: suggestions,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["suggestions"],
        queryFn: api.getSuggestions,
    });

    if (isPending) {
        return (
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Typography color="error" sx={{ pt: 4 }}>
                Failed to load suggestions.
            </Typography>
        );
    }

    const filteredSuggestions = suggestions?.filter((suggestion) =>
        suggestion?.title
            .toLowerCase()
            .includes(searchTerm?.trim().toLowerCase()),
    );

    function handleAddSuggestion() {
        createSuggestionMutation.mutate({
            title: title.trim(),
            description: description.trim(),
            category,
            status: "under_review",
        });
    }

    function clearModal() {
        setTitle("");
        setDescription("");
        setCategory("");
        setTitleTouched(false);
        setDescriptionTouched(false);
        setCategoryTouched(false);
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<AddBox />}
                    onClick={() => handleOpen()}
                >
                    Add Suggestion
                </Button>
                <TextField
                    type="search"
                    size="small"
                    label="Search Suggestions"
                    placeholder="Search by title..."
                    value={searchTerm}
                    slotProps={{ inputLabel: { shrink: true } }}
                    onChange={(event) => setSearchTerm(event.target.value)}
                ></TextField>
            </Box>

            {filteredSuggestions?.map((suggestion, id) => {
                return <Suggestion key={id} suggestion={suggestion} />;
            })}

            <Modal open={open} onClose={handleClose} title="Add Suggestion">
                <TextField
                    label="Title"
                    variant="outlined"
                    multiline
                    required
                    error={titleTouched && title.trim() === ""}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => setTitleTouched(true)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    required
                    error={descriptionTouched && description.trim() === ""}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => setDescriptionTouched(true)}
                    rows={6}
                />
                <TextField
                    label="Category"
                    value={category}
                    select
                    required
                    error={categoryTouched && category === ""}
                    onChange={(e) => setCategory(e.target.value)}
                    onBlur={() => setCategoryTouched(true)}
                >
                    <MenuItem value="process">Process</MenuItem>
                    <MenuItem value="product">Product</MenuItem>
                    <MenuItem value="member_experience">
                        Member Experience
                    </MenuItem>
                </TextField>
                {createSuggestionMutation.isError && (
                    <Typography color="error" role="alert">
                        {createSuggestionMutation.error.message ||
                            "Failed to add suggestion."}
                    </Typography>
                )}
                <LoadingButton
                    isLoading={createSuggestionMutation.isPending}
                    onClick={handleAddSuggestion}
                    disabled={
                        title.trim() === "" ||
                        description.trim() === "" ||
                        category === ""
                    }
                    label="Add"
                />
            </Modal>
        </>
    );
}
