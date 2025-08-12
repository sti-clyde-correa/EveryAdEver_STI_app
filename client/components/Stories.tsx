import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Plus } from "lucide-react";

interface Story {
  id: string;
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
  hasStory: boolean;
  isViewed?: boolean;
}

interface StoriesProps {
  stories: Story[];
  currentUser?: {
    name: string;
    username: string;
    avatar?: string;
  };
}

export default function Stories({ stories, currentUser }: StoriesProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {/* Add Your Story */}
        {currentUser && (
          <div className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group">
            <div className="relative">
              <Avatar className="h-16 w-16 ring-2 ring-border">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background group-hover:scale-110 transition-transform">
                <Plus className="h-3 w-3 text-primary-foreground" />
              </div>
            </div>
            <span className="text-xs text-center text-muted-foreground font-medium">
              Your Story
            </span>
          </div>
        )}

        {/* Stories */}
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group"
          >
            <div className="relative">
              <div
                className={`p-0.5 rounded-full ${
                  story.hasStory && !story.isViewed
                    ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
                    : story.hasStory && story.isViewed
                      ? "bg-muted"
                      : "bg-transparent"
                }`}
              >
                <Avatar className="h-16 w-16 ring-2 ring-background">
                  <AvatarImage src={story.user.avatar} />
                  <AvatarFallback>
                    {story.user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <span className="text-xs text-center text-foreground font-medium truncate w-full">
              {story.user.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
