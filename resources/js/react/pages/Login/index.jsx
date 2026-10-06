import { Box, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@/react/components/LoadingButton";
import { api } from "@/react/lib/api";
import { centeredContainerSx } from "@/react/styles/common";

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
        <Box sx={centeredContainerSx}>
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
            />
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
            />
            <LoadingButton
                isLoading={loginMutation.isPending}
                onClick={handleLogin}
                disabled={!email || !password}
                label="Login"
            />
        </Box>
    );
}
