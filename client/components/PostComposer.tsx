import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Image, Smile, MapPin, Calendar } from "lucide-react";

interface PostComposerProps {
  currentUser?: {
    name: string;
    username: string;
    avatar?: string;
  };
  onPost?: (content: string, image?: File) => void;
}

export default function PostComposer({
  currentUser,
  onPost,
}: PostComposerProps) {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (content.trim() || selectedImage) {
      onPost?.(content, selectedImage || undefined);
      setContent("");
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const remainingChars = 280 - content.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={currentUser?.avatar} />
          <AvatarFallback>
            {currentUser?.name?.slice(0, 2).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border-0 bg-transparent resize-none text-lg placeholder:text-muted-foreground focus-visible:ring-0 p-0"
            rows={3}
            maxLength={280}
          />

          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Selected"
                className="max-h-64 rounded-lg object-cover border border-border"
              />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              <label className="cursor-pointer hover:bg-secondary p-2 rounded-full transition-colors">
                <Image className="h-5 w-5 text-primary" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <button className="hover:bg-secondary p-2 rounded-full transition-colors">
                <Smile className="h-5 w-5 text-primary" />
              </button>

              <button className="hover:bg-secondary p-2 rounded-full transition-colors">
                <MapPin className="h-5 w-5 text-primary" />
              </button>

              <button className="hover:bg-secondary p-2 rounded-full transition-colors">
                <Calendar className="h-5 w-5 text-primary" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {content.length > 0 && (
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      remainingChars < 20 ? "border-red-500" : "border-primary"
                    }`}
                  >
                    <span
                      className={`text-xs font-medium ${
                        remainingChars < 20 ? "text-red-500" : "text-primary"
                      }`}
                    >
                      {remainingChars < 20 ? remainingChars : ""}
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handlePost}
                disabled={!content.trim() && !selectedImage}
                size="sm"
                className="px-6"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
