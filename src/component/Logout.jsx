"use client";
import React from 'react';
import { useRouter } from "next/navigation";

export default function Logout() {

    const router = useRouter()

    const handleLogout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
        });
        if (response.ok) {
            router.refresh()
        }
    }
    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}