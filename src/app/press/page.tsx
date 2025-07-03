import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Download, Mail } from "lucide-react";

const pressReleases = [
  {
    id: 1,
    title: "SolveTogether Reaches 100,000 Active Problem-Solvers Milestone",
    date: "2025-01-20",
    excerpt:
      "Platform celebrates major growth milestone as community-driven solutions reach new heights.",
    link: "#",
  },
  {
    id: 2,
    title:
      "New AI-Powered Matching System Connects Challenges with Expert Solvers",
    date: "2025-01-10",
    excerpt:
      "Advanced algorithm improves solution quality by 40% through better challenge-solver matching.",
    link: "#",
  },
  {
    id: 3,
    title:
      "SolveTogether Partners with Leading Universities for Research Initiative",
    date: "2023-12-15",
    excerpt:
      "Collaboration aims to study the effectiveness of crowdsourced problem-solving in academic settings.",
    link: "#",
  },
  {
    id: 4,
    title: "Platform Launches Enterprise Solutions for Corporate Innovation",
    date: "2023-11-28",
    excerpt:
      "New B2B offering helps companies harness collective intelligence for business challenges.",
    link: "#",
  },
];

const mediaKit = [
  {
    name: "Company Logo Pack",
    description: "High-resolution logos in various formats (PNG, SVG, EPS)",
    size: "2.3 MB",
  },
  {
    name: "Brand Guidelines",
    description:
      "Complete brand identity guide including colors, fonts, and usage rules",
    size: "1.8 MB",
  },
  {
    name: "Product Screenshots",
    description: "High-quality screenshots of our platform and key features",
    size: "5.2 MB",
  },
  {
    name: "Executive Photos",
    description: "Professional headshots of our leadership team",
    size: "3.1 MB",
  },
];

const awards = [
  {
    year: "2025",
    award: "Best Collaboration Platform",
    organization: "TechCrunch Innovation Awards",
  },
  {
    year: "2023",
    award: "Rising Star in Social Impact",
    organization: "Social Good Summit",
  },
  {
    year: "2023",
    award: "Community Choice Award",
    organization: "Product Hunt",
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Press & Media</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest news, press releases, and media resources for journalists and
            content creators covering SolveTogether and the collaborative
            problem-solving space.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Press Releases */}
            <section>
              <h2 className="text-2xl font-semibold mb-8">
                Latest Press Releases
              </h2>
              <div className="space-y-6">
                {pressReleases.map((release) => (
                  <Card
                    key={release.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 hover:text-primary transition-colors">
                            {release.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(release.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-muted-foreground">
                            {release.excerpt}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-4">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* Company Facts */}
            <section>
              <h2 className="text-2xl font-semibold mb-8">Company Facts</h2>
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold mb-4">Key Statistics</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Founded:</strong> 2022
                        </li>
                        <li>
                          <strong>Active Users:</strong> 100,000+
                        </li>
                        <li>
                          <strong>Challenges Solved:</strong> 50,000+
                        </li>
                        <li>
                          <strong>Countries:</strong> 120+
                        </li>
                        <li>
                          <strong>Solutions Generated:</strong> 200,000+
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Leadership</h3>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>CEO:</strong> Sarah Chen
                        </li>
                        <li>
                          <strong>CTO:</strong> Marcus Johnson
                        </li>
                        <li>
                          <strong>Head of Community:</strong> Lisa Park
                        </li>
                        <li>
                          <strong>Head of Product:</strong> Alex Thompson
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Awards */}
            <section>
              <h2 className="text-2xl font-semibold mb-8">
                Awards & Recognition
              </h2>
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{award.award}</h3>
                          <p className="text-sm text-muted-foreground">
                            {award.organization}
                          </p>
                        </div>
                        <Badge variant="outline">{award.year}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Media Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Media Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Press Inquiries</p>
                    <p className="text-muted-foreground">
                      press@solvetogether.com
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Partnership Inquiries</p>
                    <p className="text-muted-foreground">
                      partnerships@solvetogether.com
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">General Media</p>
                    <p className="text-muted-foreground">
                      media@solvetogether.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Kit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Media Kit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mediaKit.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.size}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button className="w-full mt-4">Download All</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Mission</p>
                    <p className="text-muted-foreground">
                      Democratizing problem-solving through collaborative
                      intelligence
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Headquarters</p>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                  <div>
                    <p className="font-medium">Funding</p>
                    <p className="text-muted-foreground">Series A, $15M</p>
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
