"use server"
export async function fetchUser() {
        const res = await fetch("/api/user");
        if (res.ok) {
            const data = await res.json();
            return data;
        }
        return null;
}