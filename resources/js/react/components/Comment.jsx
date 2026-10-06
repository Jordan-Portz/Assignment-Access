import { Box, Divider, Typography } from "@mui/material";

export default function Comment({ comment }) {
    return (
        <Box>
            <Divider />
            <Box sx={{ p: "8px 0px" }}>
                <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
                    {comment?.user?.name}
                </Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                    {comment?.message}
                </Typography>
            </Box>
        </Box>
    );
}
