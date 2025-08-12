import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

export default function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { icon: Home, href: "/dashboard", label: "Home" },
    { icon: Search, href: "/explore", label: "Explore" },
    { icon: PlusSquare, href: "/create", label: "Create" },
    { icon: Heart, href: "/notifications", label: "Activity" },
    { icon: User, href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center p-2 min-w-[60px] transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon
                className={`h-6 w-6 mb-1 ${isActive ? "text-primary" : ""}`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
