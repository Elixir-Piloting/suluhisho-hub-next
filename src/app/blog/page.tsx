import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "The Power of Collective Problem-Solving",
    excerpt:
      "Discover how diverse perspectives lead to breakthrough solutions and why collaboration beats individual effort.",
    author: "Sarah Chen",
    date: "2024-01-15",
    category: "Insights",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Building Effective Challenge Posts",
    excerpt:
      "Learn the best practices for writing challenge posts that attract quality solutions from the community.",
    author: "Marcus Johnson",
    date: "2024-01-10",
    category: "Tips",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "Community Spotlight: Innovation in Healthcare",
    excerpt:
      "How our community helped solve critical healthcare challenges during the pandemic.",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-05",
    category: "Success Stories",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "The Science Behind Crowdsourced Solutions",
    excerpt:
      "Research shows why diverse groups consistently outperform individual experts in problem-solving.",
    author: "Prof. David Kim",
    date: "2023-12-28",
    category: "Research",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "From Challenge to Solution: A Complete Guide",
    excerpt:
      "Step-by-step walkthrough of how problems get solved on our platform, with real examples.",
    author: "Alex Thompson",
    date: "2023-12-20",
    category: "Guide",
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "Building Trust in Online Communities",
    excerpt:
      "How we foster a safe, supportive environment where everyone feels comfortable sharing and contributing.",
    author: "Lisa Park",
    date: "2023-12-15",
    category: "Community",
    readTime: "4 min read",
  },
];

const categories = [
  "All",
  "Insights",
  "Tips",
  "Success Stories",
  "Research",
  "Guide",
  "Community",
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">SolveTogether Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, stories, and tips from our community of problem-solvers.
            Learn how collaboration is changing the way we tackle challenges.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="text-xl mb-3 hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-card rounded-lg p-8 mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest insights, success stories, and tips delivered to your
            inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
