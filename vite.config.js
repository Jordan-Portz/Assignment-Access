import path from "node:path";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/react/main.jsx"],
            refresh: true,
        }),
        react({
            babel: {
                plugins: ["babel-plugin-react-compiler"],
            },
        }),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
        extensions: [".mjs", ".js", ".jsx", ".json"],
    },

    optimizeDeps: {
        include: ["@mui/icons-material", "@mui/material", "react-router-dom"],
    },

    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        if (id.includes("@mui")) return "mui";
                        if (id.includes("react-router-dom"))
                            return "react-router-dom";
                        return "vendor";
                    }
                },
            },
        },
    },

    server: {
        host: "0.0.0.0",
        port: 5173,
        strictPort: true,
        hmr: {
            host: "localhost",
            protocol: "ws",
        },
    },
});
