"use client";
import { useRouter } from 'next/navigation';



export default function LoginPage() {
    const router = useRouter();
    const handleUserClick = async () => {
        const role = 'user';
        const res = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({ role })
        });
        if (!res) {
            return;
        }
        router.push('/home/user');

    }
    const handleAdminClick = async () => {
        const role = "admin"

        const res = await fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({ role })
        })
        if (!res) {
            return
        }
        router.push("/home/admin")
    }

    return (
        <div className="flex  gap-8 items-center justify-center min-h-screen bg-gray-100">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUserClick}>
                Go as an User
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleAdminClick}>
                Go as an Admin
            </button>
            
        </div>
    );
}