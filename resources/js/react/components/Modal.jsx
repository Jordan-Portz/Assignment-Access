import { Clear } from "@mui/icons-material";
import { Box, IconButton, Modal as MuiModal, Typography } from "@mui/material";
import { centeredContainerSx } from "@/react/styles/common";

export default function Modal({ open, onClose, title, children }) {
    return (
        <MuiModal open={open} onClose={onClose}>
            <Box sx={centeredContainerSx}>
                {title && (
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        {title}
                    </Typography>
                )}
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 12, right: 8 }}
                >
                    <Clear />
                </IconButton>
                {children}
            </Box>
        </MuiModal>
    );
}
