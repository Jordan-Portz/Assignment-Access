import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { api } from "@/react/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: api.login,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            setEmail("");
            setPassword("");
            navigate("/suggestion-board");
        },
    });

    function handleLogin() {
        loginMutation.mutate({
            email: email.trim(),
            password: password.trim(),
        });
    }

    return (
        <Box style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <Button
                variant="outlined"
                onClick={handleLogin}
                disabled={!email || !password || loginMutation.isPending}
            >
                Login
            </Button>
        </Box>
    );
}
