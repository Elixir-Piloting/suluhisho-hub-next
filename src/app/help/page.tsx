import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Book, Users, Mail } from "lucide-react";

const faqCategories = [
  {
    title: "Getting Started",
    icon: <Book className="w-5 h-5" />,
    faqs: [
      {
        question: "How do I create my first challenge?",
        answer:
          "To create a challenge, click the 'Share Challenge' button on your dashboard. Provide a clear title, detailed description, and relevant tags. The more specific you are, the better solutions you'll receive.",
      },
      {
        question: "What makes a good challenge post?",
        answer:
          "Good challenges are specific, provide context, include what you've already tried, and clearly state what kind of help you need. Use relevant tags and be respectful of the community's time.",
      },
      {
        question: "How do I find challenges to solve?",
        answer:
          "Browse the dashboard to see all challenges, use the search function to find specific topics, or filter by tags that match your expertise. You can also sort by newest, most voted, or most solutions.",
      },
    ],
  },
  {
    title: "Solutions & Voting",
    icon: <MessageCircle className="w-5 h-5" />,
    faqs: [
      {
        question: "How does the voting system work?",
        answer:
          "Community members can upvote or downvote both challenges and solutions. Upvotes indicate helpful, well-thought-out content, while downvotes are for content that doesn't contribute meaningfully to the discussion.",
      },
      {
        question: "What should I include in my solution?",
        answer:
          "Provide detailed, actionable advice. Explain your reasoning, share relevant resources, and be specific about implementation. If you're referencing external sources, include proper attribution.",
      },
      {
        question: "Can I edit my solution after posting?",
        answer:
          "Currently, solutions cannot be edited after posting to maintain the integrity of the voting system. Make sure to review your solution carefully before submitting.",
      },
    ],
  },
  {
    title: "Account & Profile",
    icon: <Users className="w-5 h-5" />,
    faqs: [
      {
        question: "How do I update my profile information?",
        answer:
          "Go to your profile page and click the edit button. You can update your display name, bio, and other profile information. Changes are saved automatically.",
      },
      {
        question: "Can I see my contribution history?",
        answer:
          "Yes! Your profile page shows all the challenges you've posted and solutions you've contributed, along with their vote counts and engagement metrics.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Account deletion can be requested by contacting our support team. Please note that your contributions may remain visible to maintain the integrity of ongoing discussions.",
      },
    ],
  },
  {
    title: "Community Guidelines",
    icon: <Users className="w-5 h-5" />,
    faqs: [
      {
        question: "What content is not allowed?",
        answer:
          "We don't allow spam, harassment, hate speech, personal attacks, or content that violates others' privacy. Commercial promotion should be relevant and helpful, not purely self-promotional.",
      },
      {
        question: "How do I report inappropriate content?",
        answer:
          "Use the report button on any post or solution, or contact our moderation team directly. All reports are reviewed promptly and appropriate action is taken.",
      },
      {
        question: "What happens if I violate the guidelines?",
        answer:
          "Depending on the severity, consequences range from content removal and warnings to temporary restrictions or permanent bans. We always aim to educate first and enforce fairly.",
      },
    ],
  },
];

const quickLinks = [
  { title: "Community Guidelines", href: "/guidelines" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
  { title: "Contact Support", href: "#contact" },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions, learn how to use our platform
            effectively, and get the support you need.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search help articles..." className="pl-10" />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* FAQ Sections */}
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="text-primary">{category.icon}</div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem
                          key={faqIndex}
                          value={`item-${categoryIndex}-${faqIndex}`}
                        >
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Support */}
            <Card className="mt-12" id="contact">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  Still Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Can't find the answer you're looking for? Our support team is
                  here to help. Send us a message and we'll get back to you as
                  soon as possible.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">General Support</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      For general questions and platform help
                    </p>
                    <p className="text-sm font-medium">
                      support@solvetogether.com
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technical Issues</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      For bugs, errors, and technical problems
                    </p>
                    <p className="text-sm font-medium">
                      tech@solvetogether.com
                    </p>
                  </div>
                </div>
                <Button className="mt-6">Contact Support</Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="block text-sm hover:text-primary transition-colors"
                  >
                    How to write effective challenge posts
                  </a>
                  <a
                    href="#"
                    className="block text-sm hover:text-primary transition-colors"
                  >
                    Best practices for solution contributors
                  </a>
                  <a
                    href="#"
                    className="block text-sm hover:text-primary transition-colors"
                  >
                    Understanding the voting system
                  </a>
                  <a
                    href="#"
                    className="block text-sm hover:text-primary transition-colors"
                  >
                    Building your reputation in the community
                  </a>
                  <a
                    href="#"
                    className="block text-sm hover:text-primary transition-colors"
                  >
                    Reporting and moderation process
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Users</span>
                    <span className="font-medium">100K+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Challenges Solved
                    </span>
                    <span className="font-medium">50K+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Solutions Posted
                    </span>
                    <span className="font-medium">200K+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Countries</span>
                    <span className="font-medium">120+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
