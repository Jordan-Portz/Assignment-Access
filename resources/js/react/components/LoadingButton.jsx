import { Button, CircularProgress } from "@mui/material";

export default function LoadingButton({
    isLoading,
    label,
    disabled,
    onClick,
    ...props
}) {
    return (
        <Button
            color="primary"
            variant="contained"
            onClick={onClick}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? <CircularProgress size="24px" /> : label}
        </Button>
    );
}
