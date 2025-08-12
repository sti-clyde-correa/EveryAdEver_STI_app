import Header from "../components/Header";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Stories from "../components/Stories";
import PostComposer from "../components/PostComposer";
import Post from "../components/Post";
import BottomNavigation from "../components/BottomNavigation";

export default function Index() {
  const currentUser = {
    name: "John Doe",
    username: "johndoe",
    avatar: "/api/placeholder/40/40",
    followers: 1245,
    following: 842,
  };

  const stories = [
    {
      id: "1",
      user: {
        name: "Alice Johnson",
        username: "alicej",
        avatar: "/api/placeholder/64/64",
      },
      hasStory: true,
      isViewed: false,
    },
    {
      id: "2",
      user: {
        name: "Bob Wilson",
        username: "bobw",
        avatar: "/api/placeholder/64/64",
      },
      hasStory: true,
      isViewed: true,
    },
    {
      id: "3",
      user: {
        name: "Carol Davis",
        username: "carold",
        avatar: "/api/placeholder/64/64",
      },
      hasStory: true,
      isViewed: false,
    },
    {
      id: "4",
      user: {
        name: "David Miller",
        username: "davidm",
        avatar: "/api/placeholder/64/64",
      },
      hasStory: true,
      isViewed: false,
    },
    {
      id: "5",
      user: {
        name: "Eva Brown",
        username: "evab",
        avatar: "/api/placeholder/64/64",
      },
      hasStory: true,
      isViewed: true,
    },
  ];

  const samplePosts = [
    {
      user: {
        name: "Sarah Chen",
        username: "sarahchen",
        avatar: "/api/placeholder/40/40",
        verified: true,
      },
      content: {
        text: "Just launched my new SaaS product with EveryAdEver! The template made it so easy to get started. Loving the clean design and responsive layout. 🚀",
        image: "/api/placeholder/500/300",
      },
      timestamp: "2h",
      likes: 124,
      comments: 23,
      shares: 12,
      isLiked: false,
    },
    {
      user: {
        name: "Alex Rivera",
        username: "alexrivera",
        avatar: "/api/placeholder/40/40",
      },
      content: {
        text: "The future of web development is here! Next.js 14 + Tailwind CSS is such a powerful combination. What are your thoughts on the new app router? 💭",
      },
      timestamp: "4h",
      likes: 89,
      comments: 15,
      shares: 7,
    },
    {
      user: {
        name: "Jordan Kim",
        username: "jordankim",
        avatar: "/api/placeholder/40/40",
        verified: true,
      },
      content: {
        text: "Building in public: Day 30 of my startup journey. Today I integrated the payment system and user authentication. The community support has been incredible! 🙏",
        image: "/api/placeholder/500/280",
      },
      timestamp: "6h",
      likes: 156,
      comments: 31,
      shares: 18,
      isLiked: true,
    },
    {
      user: {
        name: "Emma Thompson",
        username: "emmathompson",
        avatar: "/api/placeholder/40/40",
      },
      content: {
        text: "Hot take: Dark mode should be the default for all applications. It's better for your eyes and looks more professional. Change my mind! 🌙",
      },
      timestamp: "8h",
      likes: 203,
      comments: 67,
      shares: 34,
    },
  ];

  const handlePost = (content: string, image?: File) => {
    console.log("New post:", content, image);
    // Here you would typically send the data to your API
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Layout */}
      <div className="flex max-w-7xl mx-auto pt-16">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <LeftSidebar currentUser={currentUser} />
        </div>

        {/* Main Feed */}
        <main className="flex-1 min-w-0 px-4 lg:px-6">
          <div className="max-w-2xl mx-auto py-6 pb-20 lg:pb-6 space-y-6">
            {/* Stories */}
            <Stories stories={stories} currentUser={currentUser} />

            {/* Post Composer */}
            <PostComposer currentUser={currentUser} onPost={handlePost} />

            {/* Feed */}
            <div className="space-y-6">
              {samplePosts.map((post, index) => (
                <Post key={index} {...post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-8">
              <p className="text-muted-foreground">You're all caught up! 🎉</p>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Hidden on tablet and mobile */}
        <div className="hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
