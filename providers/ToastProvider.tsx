"use client"

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";



const ToastProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 6000, // stay longer (default is 4000ms)
                style: {
                    background: "#ffffff",
                    color: "#1f2937", // text-gray-800
                    borderRadius: "8px",
                    padding: "12px 16px",
                    fontSize: "14px",
                    border: "1px solid #e5e7eb", // light gray border
                    boxShadow:
                    "0 4px 10px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
                },
                success: {
                    style: {
                        background: "#f0fdf4",
                        color: "#166534",
                        border: "1px solid #22c55e",
                    },
                    iconTheme: {
                        primary: "#22c55e",
                        secondary: "#f0fdf4",
                    },
                },
                error: {
                    style: {
                        background: "#fef2f2",
                        color: "#991b1b",
                        border: "1px solid #ef4444",
                    },
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#fef2f2",
                    },
                },
            }}
        />
    );
}

export default ToastProvider;