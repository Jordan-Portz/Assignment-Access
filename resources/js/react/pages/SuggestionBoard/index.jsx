import { AddBox, Search } from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    InputAdornment,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import LoadingButton from "@/react/components/LoadingButton";
import Modal from "@/react/components/Modal";
import Suggestion from "@/react/components/Suggestion";
import { api } from "@/react/lib/api";
import {
    suggestionStatuses,
    suggestionCategories,
} from "@/react/lib/suggestionOptions";

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
    const [touched, setTouched] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        category: "all",
        status: "all",
    });
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

    const filteredSuggestions = suggestions?.filter((suggestion) => {
        const matchSearch = suggestion?.title
            .toLowerCase()
            .includes(searchTerm?.trim().toLowerCase());

        const matchCategory =
            filters.category === "all" ||
            suggestion?.category === filters.category;

        const matchStatus =
            filters.status === "all" || suggestion?.status === filters.status;

        return matchSearch && matchCategory && matchStatus;
    });

    const markTouched = (field) => () =>
        setTouched((current) => ({ ...current, [field]: true }));

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
        setTouched({});
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    flexWrap: "wrap",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<AddBox />}
                    onClick={handleOpen}
                >
                    Add Suggestion
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 2,
                        ml: "auto",
                        flexWrap: "wrap",
                    }}
                >
                    <TextField
                        label="Category"
                        select
                        size="small"
                        sx={{ width: 200, flexShrink: 0 }}
                        slotProps={{ inputLabel: { shrink: true } }}
                        value={filters.category}
                        onChange={(e) =>
                            setFilters((current) => ({
                                ...current,
                                category: e.target.value,
                            }))
                        }
                    >
                        <MenuItem value="all">All Categories</MenuItem>
                        {suggestionCategories?.map(({ value, label }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Status"
                        select
                        size="small"
                        sx={{ width: 200, flexShrink: 0 }}
                        slotProps={{ inputLabel: { shrink: true } }}
                        value={filters.status}
                        onChange={(e) =>
                            setFilters((current) => ({
                                ...current,
                                status: e.target.value,
                            }))
                        }
                    >
                        <MenuItem value="all">All Statuses</MenuItem>
                        {suggestionStatuses?.map(({ value, label }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        type="search"
                        size="small"
                        placeholder="Search by title..."
                        value={searchTerm}
                        sx={{ flexShrink: 0 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            },
                            inputLabel: { shrink: true },
                        }}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </Box>
            </Box>

            {filteredSuggestions?.length ? (
                filteredSuggestions.map((suggestion) => (
                    <Suggestion key={suggestion.id} suggestion={suggestion} />
                ))
            ) : (
                <Typography variant="h6" sx={{ py: 3, textAlign: "center" }}>
                    No suggestions found.
                </Typography>
            )}

            <Modal open={open} onClose={handleClose} title="Add Suggestion">
                <TextField
                    label="Title"
                    variant="outlined"
                    multiline
                    required
                    error={touched.title && title.trim() === ""}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={markTouched("title")}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    required
                    error={touched.description && description.trim() === ""}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={markTouched("description")}
                    rows={6}
                />
                <TextField
                    label="Category"
                    value={category}
                    select
                    required
                    error={touched.category && category === ""}
                    onChange={(e) => setCategory(e.target.value)}
                    onBlur={markTouched("category")}
                >
                    {suggestionCategories?.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
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
