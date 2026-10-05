import {
    AppBar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/react/lib/api";

export default function App() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: api.getCurrentUser,
        retry: false,
    });

    const logoutMutation = useMutation({
        mutationFn: api.logout,
        onSuccess: async () => {
            await queryClient.removeQueries({ queryKey: ["user"] });
            navigate("/");
        },
    });

    function handleLogout() {
        logoutMutation.mutate();
    }

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <AppBar position="static" color="primary" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Access Suggest
                    </Typography>

                    {user && user.email && (
                        <>
                            <Typography variant="body1">
                                Logged in as: <strong>{user.name}</strong>
                            </Typography>
                            <IconButton
                                sx={{ color: "inherit" }}
                                onClick={() => {
                                    handleLogout();
                                }}
                                disabled={logoutMutation.isPending}
                            >
                                <Logout />
                            </IconButton>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container
                maxWidth="lg"
                sx={{
                    pt: 3,
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                }}
            >
                <Outlet />
            </Container>
        </Box>
    );
}
