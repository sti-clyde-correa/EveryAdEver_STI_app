import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  Settings,
  MoreHorizontal,
  Hash,
  Users,
  Zap,
} from "lucide-react";

interface LeftSidebarProps {
  currentUser?: {
    name: string;
    username: string;
    avatar?: string;
    followers: number;
    following: number;
  };
}

export default function LeftSidebar({ currentUser }: LeftSidebarProps) {
  const navItems = [
    { icon: Home, label: "Home", href: "/", active: true },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Bell, label: "Notifications", href: "/notifications", badge: 3 },
    { icon: Mail, label: "Messages", href: "/messages", badge: 2 },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
    { icon: Hash, label: "Topics", href: "/topics" },
    { icon: Users, label: "Communities", href: "/communities" },
    { icon: Zap, label: "Moments", href: "/moments" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="w-64 h-full flex flex-col p-6 border-r border-border bg-background/50">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-primary-foreground rounded-sm transform rotate-45"></div>
          </div>
          <span className="text-xl font-bold text-foreground">EveryAdEver</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors hover:bg-secondary group ${
              item.active
                ? "bg-secondary text-primary"
                : "text-muted-foreground"
            }`}
          >
            <item.icon
              className={`h-5 w-5 ${item.active ? "text-primary" : "group-hover:text-foreground"}`}
            />
            <span
              className={`font-medium ${item.active ? "text-foreground" : "group-hover:text-foreground"}`}
            >
              {item.label}
            </span>
            {item.badge && (
              <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        <button className="flex items-center gap-4 px-4 py-3 rounded-lg transition-colors hover:bg-secondary group text-muted-foreground w-full text-left">
          <MoreHorizontal className="h-5 w-5 group-hover:text-foreground" />
          <span className="font-medium group-hover:text-foreground">More</span>
        </button>
      </nav>

      {/* Post Button */}
      <Button className="w-full mb-6 py-3 text-lg font-semibold">Post</Button>

      {/* User Profile */}
      {currentUser && (
        <div className="mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>
                {currentUser.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">
                {currentUser.name}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                @{currentUser.username}
              </p>
            </div>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex justify-around py-3 mt-2 border-t border-border">
            <div className="text-center">
              <p className="font-semibold text-foreground">
                {currentUser.following}
              </p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">
                {currentUser.followers}
              </p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
