import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, TrendingUp, Users, MoreHorizontal } from "lucide-react";

interface TrendingTopic {
  category: string;
  topic: string;
  posts: string;
}

interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  verified?: boolean;
  mutualFollowers?: number;
}

interface RightSidebarProps {
  trendingTopics?: TrendingTopic[];
  suggestedUsers?: SuggestedUser[];
}

export default function RightSidebar({
  trendingTopics = [],
  suggestedUsers = [],
}: RightSidebarProps) {
  const defaultTrending: TrendingTopic[] = [
    { category: "Technology", topic: "NextJS", posts: "12.5K" },
    { category: "Design", topic: "Tailwind CSS", posts: "8.2K" },
    { category: "Trending", topic: "EveryAdEver", posts: "5.7K" },
    { category: "Programming", topic: "React", posts: "25.3K" },
    { category: "Startup", topic: "SaaS", posts: "4.1K" },
  ];

  const defaultSuggested: SuggestedUser[] = [
    {
      id: "1",
      name: "Sarah Chen",
      username: "sarahchen",
      verified: true,
      mutualFollowers: 3,
    },
    {
      id: "2",
      name: "Alex Rivera",
      username: "alexrivera",
      mutualFollowers: 5,
    },
    {
      id: "3",
      name: "Jordan Kim",
      username: "jordankim",
      verified: true,
      mutualFollowers: 2,
    },
  ];

  const trending = trendingTopics.length > 0 ? trendingTopics : defaultTrending;
  const suggested =
    suggestedUsers.length > 0 ? suggestedUsers : defaultSuggested;

  return (
    <div className="w-80 h-full flex flex-col p-6 space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search EveryAdEver"
          className="pl-10 bg-secondary/50 border-0 focus-visible:ring-1"
        />
      </div>

      {/* Trending */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            What's happening
          </h2>
        </div>
        <div className="divide-y divide-border">
          {trending.map((trend, index) => (
            <div
              key={index}
              className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {trend.category} · Trending
                  </p>
                  <p className="font-semibold text-foreground mt-1">
                    #{trend.topic}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {trend.posts} posts
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 p-0 h-auto"
          >
            Show more
          </Button>
        </div>
      </div>

      {/* Who to follow */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5" />
            Who to follow
          </h2>
        </div>
        <div className="divide-y divide-border">
          {suggested.map((user) => (
            <div
              key={user.id}
              className="p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-foreground truncate">
                      {user.name}
                    </p>
                    {user.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    @{user.username}
                  </p>
                  {user.mutualFollowers && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Followed by {user.mutualFollowers} people you follow
                    </p>
                  )}
                </div>
                <Button size="sm" variant="outline" className="flex-shrink-0">
                  Follow
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 p-0 h-auto"
          >
            Show more
          </Button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-xs text-muted-foreground space-y-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Cookie Policy
          </a>
          <a href="#" className="hover:underline">
            Accessibility
          </a>
          <a href="#" className="hover:underline">
            Ads info
          </a>
          <a href="#" className="hover:underline">
            More
          </a>
        </div>
        <p>© 2024 EveryAdEver, Inc.</p>
      </div>
    </div>
  );
}
