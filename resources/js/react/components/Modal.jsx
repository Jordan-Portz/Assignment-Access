import { Box, IconButton, Modal as MuiModal, Typography } from "@mui/material";
import { Clear } from "@mui/icons-material";

export default function Modal({ open, onClose, title, children }) {
    return (
        <MuiModal open={open} onClose={onClose}>
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
                    backgroundColor: "background.paper",
                    borderRadius: "16px",
                }}
            >
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
