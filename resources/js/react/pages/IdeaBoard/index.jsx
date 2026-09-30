import {
    Box,
    Button,
    MenuItem,
    Modal,
    TextField,
    Select,
    Typography,
} from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import Suggestion from "@/react/components/Suggestion";
import { useState } from "react";

export default function IdeaBoard() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [titleTouched, setTitleTouched] = useState(false);
    const [descriptionTouched, setDescriptionTouched] = useState(false);
    // const {
    //     data: tasks,
    //     isPending,
    //     isError,
    // } = useQuery({
    //     queryKey: ["tasks"],
    //     queryFn: api.getTasks,
    // });

    // if (isPending) {
    //     return (
    //         <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
    //             <CircularProgress />
    //         </Box>
    //     );
    // }

    // if (isError) {
    //     return (
    //         <Typography color="error" sx={{ pt: 4 }}>
    //             Failed to load tasks.
    //         </Typography>
    //     );
    // }

    function handleAddSuggestion() {
        console.log("Adding suggestion:", title, description, type);
        setTitle("");
        setDescription("");
        setType("");
        handleClose();
    }

    // TODO: Move types to enum?

    return (
        <Box>
            <Button
                variant="contained"
                color="primary"
                endIcon={<AddBox />}
                onClick={() => handleOpen()}
            >
                Add Suggestion
            </Button>
            <Suggestion title="Test Title" description="Test description" />
            <Suggestion title="Test Title2" description="Test description2" />

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        width: 400,
                        p: 2,
                        gap: 1,
                        backgroundColor: "white",
                    }}
                >
                    <Typography>Add Suggestion</Typography>
                    <TextField
                        label="Suggestion"
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
                    <Select
                        label="Type"
                        value={type}
                        required
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="process">Process</MenuItem>
                        <MenuItem value="product">Product</MenuItem>
                        <MenuItem value="memberExperience">
                            Member Experience
                        </MenuItem>
                    </Select>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSuggestion}
                        disabled={
                            title.trim() === "" || description.trim() === ""
                        }
                    >
                        Add
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
