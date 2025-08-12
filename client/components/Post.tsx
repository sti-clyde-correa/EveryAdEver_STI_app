import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface PostProps {
  user: {
    name: string;
    username: string;
    avatar?: string;
    verified?: boolean;
  };
  content: {
    text?: string;
    image?: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export default function Post({
  user,
  content,
  timestamp,
  likes,
  comments,
  shares,
  isLiked = false,
  isBookmarked = false,
}: PostProps) {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likesCount, setLikesCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:bg-card/80 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{user.name}</h3>
              {user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              @{user.username} · {timestamp}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="mb-4">
        {content.text && (
          <p className="text-foreground leading-relaxed mb-3">{content.text}</p>
        )}
        {content.image && (
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={content.image}
              alt="Post content"
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 hover:text-red-500 transition-colors group"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                liked
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground group-hover:text-red-500"
              }`}
            />
            <span className="text-sm text-muted-foreground">{likesCount}</span>
          </button>

          <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group">
            <MessageCircle className="h-5 w-5 text-muted-foreground group-hover:text-blue-500" />
            <span className="text-sm text-muted-foreground">{comments}</span>
          </button>

          <button className="flex items-center gap-2 hover:text-green-500 transition-colors group">
            <Share className="h-5 w-5 text-muted-foreground group-hover:text-green-500" />
            <span className="text-sm text-muted-foreground">{shares}</span>
          </button>
        </div>

        <button
          onClick={handleBookmark}
          className="hover:text-yellow-500 transition-colors"
        >
          <Bookmark
            className={`h-5 w-5 transition-colors ${
              bookmarked
                ? "fill-yellow-500 text-yellow-500"
                : "text-muted-foreground hover:text-yellow-500"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
