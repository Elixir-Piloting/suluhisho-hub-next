import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Lightbulb, Heart, Target } from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Join our engineering team to build scalable solutions that connect problem-solvers worldwide.",
    requirements: [
      "5+ years experience with React/Node.js",
      "Experience with real-time applications",
      "Strong problem-solving skills",
    ],
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "Design intuitive experiences that make collaboration seamless and engaging for our global community.",
    requirements: [
      "3+ years in product design",
      "Experience with design systems",
      "User research background",
    ],
  },
  {
    id: 3,
    title: "Community Manager",
    department: "Community",
    location: "Remote",
    type: "Full-time",
    description:
      "Foster and grow our community of problem-solvers, ensuring everyone feels welcome and valued.",
    requirements: [
      "Community management experience",
      "Excellent communication skills",
      "Passion for helping others",
    ],
  },
  {
    id: 4,
    title: "Data Scientist",
    department: "Analytics",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Analyze community interactions and solution patterns to improve our matching algorithms.",
    requirements: [
      "PhD in relevant field",
      "Machine learning expertise",
      "Python/R proficiency",
    ],
  },
  {
    id: 5,
    title: "Marketing Intern",
    department: "Marketing",
    location: "Remote",
    type: "Internship",
    description:
      "Help spread the word about collaborative problem-solving and grow our community.",
    requirements: [
      "Currently enrolled in university",
      "Social media savvy",
      "Creative mindset",
    ],
  },
];

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Health & Wellness",
    description:
      "Comprehensive health insurance, mental health support, and wellness stipend",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours and unlimited PTO",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Learning & Growth",
    description:
      "Professional development budget, conference attendance, and mentorship programs",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Inclusive Culture",
    description:
      "Diverse, welcoming environment where everyone's voice is heard and valued",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Join Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us build the future of collaborative problem-solving. Join a
            team that's passionate about connecting minds and creating solutions
            that matter.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Work With Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-primary mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Open Positions
          </h2>
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{job.department}</Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Clock className="w-3 h-3" />
                          {job.type}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {job.description}
                      </p>
                      <div>
                        <h4 className="font-medium mb-2">Key Requirements:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button className="ml-4">Apply Now</Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <div className="bg-card rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-semibold mb-4">Our Culture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're building more than just a platform – we're creating a
              movement. Our team embodies the collaborative spirit we promote,
              working together to solve complex challenges and make a positive
              impact on the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">Collaboration First</h3>
              <p className="text-sm text-muted-foreground">
                We practice what we preach – every decision is made
                collaboratively, and every voice matters.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Continuous Learning</h3>
              <p className="text-sm text-muted-foreground">
                We're always growing, learning from our community and each other
                to build better solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Impact Driven</h3>
              <p className="text-sm text-muted-foreground">
                Every feature we build and decision we make is guided by our
                mission to help people solve problems together.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Don't See Your Role?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for talented people who share our passion for
            collaborative problem-solving. Send us your resume and tell us how
            you'd like to contribute.
          </p>
          <Button size="lg">Get In Touch</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
