import { Box, Divider } from "@mui/material";

export default function Comment({ comment }) {
    return (
        <Box>
            <Divider />
            <p style={{ whiteSpace: "pre-line" }}>{comment?.message}</p>
        </Box>
    );
}
