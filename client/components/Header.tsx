import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Bell,
  MessageCircle,
  Heart,
  PlusSquare,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RightSidebar from "./RightSidebar";
import DropdownProfile from "./DropdownProfile";
import { createPortal } from "react-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => setMobileMenuOpen(false);

  // Check if user has a stored preference or if dark mode is currently applied
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        document.documentElement.classList.contains("dark") ||
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return true; // Default to dark mode
  });

  // Initialize theme on component mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDarkMode(shouldUseDark);

    if (shouldUseDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navigation = [
    { name: "Feed", href: "/dashboard" },
    { name: "Explore", href: "/explore" },
    { name: "Messages", href: "/messages" },
    { name: "Profile", href: "/profile" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const MobileMenu = () => (
    <div className="lg:hidden">
      <div
        className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="fixed inset-y-0 right-0 z-[9999] w-full overflow-y-auto bg-white dark:bg-background text-foreground px-6 py-6 sm:max-w-sm border-l border-border">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={handleClose}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm transform rotate-45" />
            </div>
            <span className="text-xl font-bold text-foreground">EveryAdEver</span>
          </Link>
          <button
            type="button"
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-secondary/50 border-0"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.name?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-muted-foreground">@{user?.username}</p>
              </div>
            </div>

            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary transition-colors"
                  onClick={handleClose}
                >
                  {item.name === "Feed" && <Heart className="h-5 w-5" />}
                  {item.name === "Explore" && <Search className="h-5 w-5" />}
                  {item.name === "Messages" && <MessageCircle className="h-5 w-5" />}
                  {item.name === "Profile" && (
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">U</AvatarFallback>
                    </Avatar>
                  )}
                  {item.name}
                </Link>
              ))}

              <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary transition-colors w-full text-left">
                <PlusSquare className="h-5 w-5" />
                Create Post
              </button>

              <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary transition-colors w-full text-left">
                <Bell className="h-5 w-5" />
                Notifications
                <span className="ml-auto w-3 h-3 bg-red-500 rounded-full" />
              </button>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary transition-colors w-full text-left"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary transition-colors w-full text-left text-destructive"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 z-[9999] w-full bg-background/80 backdrop-blur-md border-b border-border supports-backdrop-blur:bg-background/60">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm transform rotate-45" />
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:block">
                EveryAdEver
              </span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-secondary/50 border-0 focus-visible:ring-1"
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="p-2 rounded-lg hover:bg-secondary transition-colors group"
                title={item.name}
              >
                {item.name === "Feed" && (
                  <Heart className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                )}
                {item.name === "Explore" && (
                  <Search className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                )}
                {item.name === "Messages" && (
                  <MessageCircle className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                )}
                {item.name === "Profile" && (
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                  </Avatar>
                )}
              </Link>
            ))}

            <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <PlusSquare className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </button>

            <button className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Moon className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            {/* <DropdownProfile /> */}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors md:hidden">
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && createPortal(<MobileMenu />, document.body)}
    </>
  );
}
