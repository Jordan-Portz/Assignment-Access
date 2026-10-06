import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { api } from "@/react/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loginError, setLoginError] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: api.login,
        onSuccess: async (data) => {
            queryClient.setQueryData(["user"], data.user);
            await queryClient.removeQueries({ queryKey: ["suggestions"] });
            setEmail("");
            setPassword("");
            navigate("/suggestion-board");
        },
        onError: (error) => {
            const errors = error?.data?.errors ?? {};
            setEmailError(errors?.email?.[0] ?? "");
            setLoginError(errors?.login?.[0] ?? "");
        },
    });

    function handleLogin() {
        loginMutation.mutate({
            email: email.trim(),
            password: password.trim(),
        });
    }

    return (
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
                gap: 2,
                border: "1px solid #ccc",
                borderRadius: "16px",
            }}
        >
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                Log in
            </Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                    if (loginError) setLoginError("");
                }}
                error={emailError !== "" || loginError !== ""}
                helperText={emailError}
            ></TextField>
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginError) setLoginError("");
                }}
                error={loginError !== ""}
                helperText={loginError}
            ></TextField>
            <Button
                color="primary"
                variant="contained"
                onClick={handleLogin}
                disabled={!email || !password || loginMutation.isPending}
            >
                Login
            </Button>
        </Box>
    );
}
