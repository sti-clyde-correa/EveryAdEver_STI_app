import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  MessageCircle,
  Share2,
  Zap,
  Shield,
  Globe,
  Heart,
  Star,
  CheckCircle,
  Moon,
  Sun,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import logo from '../assets/logo.png';
import { createPortal } from "react-dom";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: MessageCircle,
      title: "Seek",
      description: "Look for events happening around you - a concert, a picnic, a meet-up, a lot of like minded people around you."
    },
    {
      icon: Globe,
      title: "Advertise",
      description: "Advertise events you want to host"
    },
    {
      icon: Users,
      title: "Get Noticed",
      description: "Get popular, Forge a reputation"
    },
    // {
    //   icon: MessageCircle,
    //   title: "Real-time Messaging",
    //   description: "Stay connected with instant messaging, group chats, and live conversations."
    // },
    // {
    //   icon: Share2,
    //   title: "Share Your Story",
    //   description: "Express yourself through posts, photos, stories, and creative content."
    // },
    // {
    //   icon: Zap,
    //   title: "Lightning Fast",
    //   description: "Experience blazing-fast performance with our optimized social platform."
    // },
    // {
    //   icon: Shield,
    //   title: "Privacy First",
    //   description: "Your data is protected with enterprise-grade security and privacy controls."
    // },
    // {
    //   icon: Globe,
    //   title: "Global Community",
    //   description: "Join a worldwide community of creators, thinkers, and innovators."
    // }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      content: "EveryAdEver has completely transformed how I connect with my audience. The platform is intuitive and powerful.",
      avatar: "/api/placeholder/48/48",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Entrepreneur",
      content: "The best social platform I've used. Clean interface, great features, and amazing community.",
      avatar: "/api/placeholder/48/48",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Designer",
      content: "Love the focus on privacy and user experience. Finally, a social platform that gets it right.",
      avatar: "/api/placeholder/48/48",
      rating: 5
    }
  ];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"> */}
            {/* <div className="w-4 h-4 bg-primary-foreground rounded-sm transform rotate-45"></div> */}
            {/* </div> */}
            <img src={logo} alt="EveryAdEver" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-foreground">EveryAdEver</span>
          </div>

          {/* <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* <a href="#" className="text-muted-foreground hover:text-foreground transition-colors active">Home</a> */}
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <Button variant="ghost" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && createPortal(
            <div className="fixed inset-0 z-[9999]">
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6 shadow-lg border-l border-border">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary-foreground rounded-sm transform rotate-45" />
                    </div>
                    <span className="text-xl font-bold text-foreground">EveryAdEver</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="space-y-6">
                  <a
                    href="#about"
                    className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>

                  <div className="space-y-4">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" asChild>
                      <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>

                  <button
                    onClick={() => {
                      toggleTheme();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary transition-colors w-full"
                  >
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                </nav>
              </div>
            </div>,
            document.body
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-24 lg:pt-32">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 sm:-top-40 sm:-right-40 sm:w-80 sm:h-80 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute top-10 -left-10 w-32 h-32 sm:top-20 sm:-left-20 sm:w-60 sm:h-60 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-24 h-24 sm:bottom-20 sm:right-20 sm:w-40 sm:h-40 bg-primary/15 dark:bg-primary/30 rounded-full blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-muted-foreground mb-8">
              <Heart className="h-4 w-4 text-red-500" />
              Join thousands of users worldwide
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Connect, Share, Advertise and
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Grow Together
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              EveryAdEver helps you find events close to you and organize them seamlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link to="/signup">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-3 bg-background/50 backdrop-blur-sm"
                asChild
              >
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Posts Shared</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section id="features" className="py-20 bg-secondary/20"> */}
      <section id="features" className="py-20 bg-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to connect
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you build meaningful relationships and share your story with the world.
              Advertise with us and get maximum attendance for your events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* about Section */}
      <section id="about" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="p-6 mx-auto">
            <h1 className="text-2xl font-bold mb-4">EveryAdEver</h1>
            <p className="mb-4">
              EveryAdEver is a leading marketing and advertising agency that
              specializes in providing innovative and effective solutions to help
              businesses reach their target audience and achieve their marketing
              goals. With a team of experienced professionals and a deep understanding
              of the ever-evolving advertising landscape, we strive to deliver
              exceptional results for our clients.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Mission</h2>
            <p className="mb-4">
              Our mission is to empower businesses of all sizes to maximize their
              marketing potential by offering comprehensive advertising services that
              drive growth, increase brand visibility, and generate measurable results.
              We are committed to staying at the forefront of industry trends and
              technologies to provide our clients with cutting-edge strategies and
              campaigns.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Services</h2>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>
                <strong>Digital Advertising:</strong> Targeted campaigns including SEM,
                social media, display, and mobile advertising.
              </li>
              <li>
                <strong>Creative Design:</strong> Stunning visuals and compelling copy
                aligned with brand identity.
              </li>
              <li>
                <strong>Branding and Strategy:</strong> Comprehensive brand positioning
                and logo design.
              </li>
              <li>
                <strong>Media Planning and Buying:</strong> Strategic media placement
                for maximum reach.
              </li>
              <li>
                <strong>Analytics and Reporting:</strong> Data-driven insights to
                optimize marketing efforts.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">Why Choose EveryAdEver?</h2>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Expertise:</strong> Industry experts delivering innovative solutions.</li>
              <li><strong>Customized Approach:</strong> Strategies tailored to client goals.</li>
              <li><strong>Results-Oriented:</strong> Focus on measurable growth and ROI.</li>
              <li><strong>Client-Centric:</strong> Transparent communication and strong relationships.</li>
              <li><strong>Ethical Practices:</strong> Integrity and compliance with regulations.</li>
            </ul>

            <p className="mt-6">
              Contact us today to discuss how EveryAdEver can help your business achieve
              its marketing objectives. Let us be your partner in success!
            </p>
          </div>


        </div>
      </section>
      {/* Testimonials Section */}
      {/* <section id="testimonials" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Loved by creators worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our community has to say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to join the community?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start connecting with amazing people and sharing your story today. It's free to get started.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-3" asChild>
              <Link to="/signup">
                Create Your Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              No credit card required
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary-foreground rounded-sm transform rotate-45"></div>
                </div>
                <span className="text-xl font-bold text-foreground">EveryAdEver</span>
              </div>
              <p className="text-muted-foreground">
                Connect, share, and grow together in a safe and engaging social environment.
              </p>
            </div>

            {/* <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div> */}

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                {/* <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li> */}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                {/* <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li> */}
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EveryAdEver. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
