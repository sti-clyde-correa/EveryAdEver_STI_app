import React, { useState, useRef, useEffect } from "react";

interface DropdownProfileProps {
    avatarUrl?: string;
    username?: string;
    onLogout?: () => void;
}

const DropdownProfile: React.FC<DropdownProfileProps> = ({
    avatarUrl,
    username = "User",
    onLogout,
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
            <div ref={ref} style={{ position: "relative", display: "inline-block", zIndex: 9999 }}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                }}
                aria-haspopup="true"
                aria-expanded={open}
            >
                <img
                    src={avatarUrl || "https://via.placeholder.com/32"}
                    alt="Avatar"
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        marginRight: 8,
                    }}
                />
                <span>{username}</span>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{ marginLeft: 4 }}
                >
                    <path
                        d="M5 8L10 13L15 8"
                        stroke="#333"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {open && (
                <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: "calc(100% + 8px)",
                            background: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            borderRadius: 8,
                            minWidth: 160,
                            zIndex: 9999,
                        }}
                >
                    <ul style={{ listStyle: "none", margin: 0, padding: "8px 0" }}>
                        <li>
                            <button
                                style={{
                                    width: "100%",
                                    background: "none",
                                    border: "none",
                                    padding: "8px 16px",
                                    textAlign: "left",
                                    cursor: "pointer",
                                }}
                                onClick={() => alert("Profile clicked")}
                            >
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                style={{
                                    width: "100%",
                                    background: "none",
                                    border: "none",
                                    padding: "8px 16px",
                                    textAlign: "left",
                                    cursor: "pointer",
                                }}
                                onClick={() => alert("Settings clicked")}
                            >
                                Settings
                            </button>
                        </li>
                        <li>
                            <button
                                style={{
                                    width: "100%",
                                    background: "none",
                                    border: "none",
                                    padding: "8px 16px",
                                    textAlign: "left",
                                    cursor: onLogout ? "pointer" : "not-allowed",
                                    color: "#d32f2f",
                                    opacity: onLogout ? 1 : 0.5,
                                }}
                                onClick={onLogout}
                                disabled={!onLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownProfile;