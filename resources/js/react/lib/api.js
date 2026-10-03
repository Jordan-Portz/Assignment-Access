/**
 * Thin API wrapper — all requests go to /api/*.
 * Add new resource helpers here as you build out the app.
 */

const BASE = "/api";

async function request(method, path, body) {
    const res = await fetch(`${BASE}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw Object.assign(new Error(data.message ?? res.statusText), {
            status: res.status,
            data,
        });
    }

    if (res.status === 204) return null;
    return res.json();
}

export const api = {
    // Suggestion
    getSuggestions: () => request("GET", "/suggestions"),
    getSuggestion: (id) => request("GET", `/suggestions/${id}`),
    getSuggestionsWithComments: () =>
        request("GET", "/suggestions/with-comments"),
    createSuggestion: (data) => request("POST", "/suggestions", data),
    deleteSuggestion: (id) => request("DELETE", `/suggestions/${id}`),
    // Comment
    createComment: (data) => request("POST", "/comments", data),
};
