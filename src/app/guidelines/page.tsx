import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";

const guidelines = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Posting Challenges",
    description:
      "How to create effective challenge posts that attract quality solutions",
    rules: [
      { type: "do", text: "Be specific and detailed about your problem" },
      {
        type: "do",
        text: "Include relevant context and background information",
      },
      { type: "do", text: "Use clear, descriptive titles" },
      {
        type: "do",
        text: "Add relevant tags to help others find your challenge",
      },
      { type: "dont", text: "Post vague or overly broad questions" },
      { type: "dont", text: "Include personal or sensitive information" },
      { type: "dont", text: "Post duplicate challenges" },
    ],
  },
  {
    icon: <ThumbsUp className="w-6 h-6" />,
    title: "Contributing Solutions",
    description:
      "Best practices for providing helpful and constructive solutions",
    rules: [
      { type: "do", text: "Provide detailed, actionable advice" },
      { type: "do", text: "Explain your reasoning and methodology" },
      { type: "do", text: "Share relevant resources and references" },
      { type: "do", text: "Be respectful of different perspectives" },
      { type: "dont", text: "Give generic or unhelpful responses" },
      {
        type: "dont",
        text: "Copy solutions from other sources without attribution",
      },
      { type: "dont", text: "Promote products or services inappropriately" },
    ],
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Interaction",
    description:
      "Guidelines for respectful and productive community engagement",
    rules: [
      { type: "do", text: "Treat all community members with respect" },
      { type: "do", text: "Engage constructively in discussions" },
      { type: "do", text: "Vote thoughtfully on solutions" },
      { type: "do", text: "Report inappropriate content" },
      { type: "dont", text: "Use offensive or discriminatory language" },
      { type: "dont", text: "Engage in personal attacks or harassment" },
      { type: "dont", text: "Spam or post irrelevant content" },
    ],
  },
];

const violations = [
  {
    severity: "minor",
    title: "Minor Violations",
    examples: ["Off-topic posts", "Duplicate content", "Poor formatting"],
    consequences: ["Content removal", "Warning message", "Guidance provided"],
  },
  {
    severity: "moderate",
    title: "Moderate Violations",
    examples: [
      "Spam or promotional content",
      "Inappropriate language",
      "Misleading information",
    ],
    consequences: [
      "Temporary restrictions",
      "Content removal",
      "Account warning",
    ],
  },
  {
    severity: "severe",
    title: "Severe Violations",
    examples: [
      "Harassment or bullying",
      "Hate speech",
      "Sharing personal information",
    ],
    consequences: [
      "Account suspension",
      "Permanent ban",
      "Legal action if necessary",
    ],
  },
];

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Community Guidelines</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our guidelines help maintain a positive, productive environment
            where everyone can contribute meaningfully to collaborative
            problem-solving. Please read and follow these guidelines to help our
            community thrive.
          </p>
        </div>

        {/* Core Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Core Principles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Respect</h3>
                <p className="text-muted-foreground">
                  Treat every community member with dignity and respect,
                  regardless of their background, experience level, or
                  perspective.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Constructive</h3>
                <p className="text-muted-foreground">
                  Focus on providing helpful, actionable solutions and feedback
                  that moves conversations forward productively.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Collaborative</h3>
                <p className="text-muted-foreground">
                  Work together to find the best solutions, building on each
                  other's ideas and expertise.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Detailed Guidelines
          </h2>
          <div className="space-y-8">
            {guidelines.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="text-primary">{section.icon}</div>
                    <div>
                      <h3 className="text-xl">{section.title}</h3>
                      <p className="text-sm text-muted-foreground font-normal">
                        {section.description}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Do
                      </h4>
                      <ul className="space-y-2">
                        {section.rules
                          .filter((rule) => rule.type === "do")
                          .map((rule, ruleIndex) => (
                            <li
                              key={ruleIndex}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {rule.text}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Don't
                      </h4>
                      <ul className="space-y-2">
                        {section.rules
                          .filter((rule) => rule.type === "dont")
                          .map((rule, ruleIndex) => (
                            <li
                              key={ruleIndex}
                              className="flex items-start gap-2 text-sm"
                            >
                              <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              {rule.text}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enforcement */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Enforcement & Consequences
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {violations.map((violation, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  violation.severity === "minor"
                    ? "border-l-yellow-500"
                    : violation.severity === "moderate"
                      ? "border-l-orange-500"
                      : "border-l-red-500"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {violation.severity === "minor" && (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                    {violation.severity === "moderate" && (
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                    )}
                    {violation.severity === "severe" && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    {violation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {violation.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Consequences:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {violation.consequences.map(
                          (consequence, consequenceIndex) => (
                            <li key={consequenceIndex}>• {consequence}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reporting */}
        <Card className="bg-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Reporting Violations
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you encounter content or behavior that violates our guidelines,
              please report it immediately. Our moderation team reviews all
              reports and takes appropriate action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Report Content
              </button>
              <button className="px-6 py-2 border border-border rounded-md hover:bg-accent transition-colors">
                Contact Moderators
              </button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
