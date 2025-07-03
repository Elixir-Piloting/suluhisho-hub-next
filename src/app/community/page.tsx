import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  Trophy,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";

const communityStats = [
  {
    label: "Active Members",
    value: "100K+",
    icon: <Users className="w-6 h-6" />,
  },
  {
    label: "Daily Discussions",
    value: "2.5K",
    icon: <MessageSquare className="w-6 h-6" />,
  },
  {
    label: "Solutions Shared",
    value: "200K+",
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    label: "Countries Represented",
    value: "120+",
    icon: <MapPin className="w-6 h-6" />,
  },
];

const events = [
  {
    title: "Global Problem-Solving Summit 2024",
    date: "March 15-17, 2024",
    location: "Virtual Event",
    description:
      "Join problem-solvers from around the world for three days of workshops, keynotes, and collaborative sessions.",
    type: "Conference",
    status: "upcoming",
  },
  {
    title: "Community Challenge: Climate Solutions",
    date: "February 1-28, 2024",
    location: "Platform-wide",
    description:
      "A month-long collaborative effort to tackle climate change challenges with innovative solutions.",
    type: "Challenge",
    status: "active",
  },
  {
    title: "Weekly Office Hours with the Team",
    date: "Every Friday, 2 PM PST",
    location: "Virtual Meetup",
    description:
      "Drop-in sessions to ask questions, share feedback, and connect with the SolveTogether team.",
    type: "Meetup",
    status: "recurring",
  },
  {
    title: "New Member Orientation",
    date: "Every Monday, 10 AM PST",
    location: "Virtual Session",
    description:
      "Learn the basics of effective problem-solving on our platform and meet other new members.",
    type: "Orientation",
    status: "recurring",
  },
];

const spotlights = [
  {
    name: "Dr. Sarah Chen",
    title: "Healthcare Innovation Specialist",
    location: "San Francisco, CA",
    contribution:
      "Led the development of a telemedicine solution that's now used by 50+ clinics",
    challenges: 23,
    solutions: 156,
    votes: 2340,
  },
  {
    name: "Marcus Rodriguez",
    title: "Sustainable Technology Engineer",
    location: "Barcelona, Spain",
    contribution:
      "Created an open-source water purification system for rural communities",
    challenges: 12,
    solutions: 89,
    votes: 1876,
  },
  {
    name: "Aisha Patel",
    title: "Educational Technology Designer",
    location: "Mumbai, India",
    contribution:
      "Designed learning tools that have helped 10,000+ students in underserved areas",
    challenges: 18,
    solutions: 134,
    votes: 2156,
  },
];

const resources = [
  {
    title: "Community Guidelines",
    description: "Learn how to participate respectfully and effectively",
    link: "/guidelines",
  },
  {
    title: "Problem-Solving Best Practices",
    description: "Tips for creating great challenges and solutions",
    link: "#",
  },
  {
    title: "Collaboration Tools",
    description: "Resources to help you work better with others",
    link: "#",
  },
  {
    title: "Success Stories",
    description: "Real examples of problems solved through our community",
    link: "#",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Our Community</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join a global network of problem-solvers, innovators, and
            collaborators working together to tackle the world's most
            challenging problems. Every voice matters, every solution counts.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-primary mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Spotlights */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Community Spotlights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {spotlights.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {member.title}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {member.contribution}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-semibold">{member.challenges}</div>
                      <div className="text-xs text-muted-foreground">
                        Challenges
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{member.solutions}</div>
                      <div className="text-xs text-muted-foreground">
                        Solutions
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{member.votes}</div>
                      <div className="text-xs text-muted-foreground">Votes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Events & Activities */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Events & Activities
          </h2>
          <div className="space-y-6">
            {events.map((event, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <Badge
                          variant={
                            event.status === "active"
                              ? "default"
                              : event.status === "upcoming"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                    <Button variant="outline" className="ml-4">
                      Learn More
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Community Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground ml-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <Card className="bg-primary text-primary-foreground text-center">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Whether you're looking to solve a challenge or help others with
              their problems, our community welcomes contributors of all
              backgrounds and experience levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Browse Challenges
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Share Your Challenge
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
