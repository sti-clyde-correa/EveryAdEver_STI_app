import { Button } from "./ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "./Header";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Construction className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            {title}
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This page is under construction. Continue prompting to fill in the
              content for this page.
            </p>

            <Button asChild variant="outline">
              <Link to="/" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
