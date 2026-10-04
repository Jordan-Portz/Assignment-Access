import { Box, Divider, Typography } from "@mui/material";

export default function Comment({ comment }) {
    return (
        <Box>
            <Divider />
            <Box style={{ padding: "8px 0px" }}>
                <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>
                    {comment?.user?.name}
                </Typography>
                <Typography style={{ whiteSpace: "pre-line" }}>
                    {comment?.message}
                </Typography>
            </Box>
        </Box>
    );
}
