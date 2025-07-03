import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Users, Target, Heart, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About SolveTogether</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe that every problem has a solution, and the best solutions
            come from collaborative thinking. SolveTogether connects
            problem-solvers worldwide to tackle challenges together.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              To democratize problem-solving by creating a platform where anyone
              can share their challenges and receive diverse, innovative
              solutions from a global community of thinkers.
            </p>
            <p className="text-muted-foreground">
              We're building a world where no one has to face their problems
              alone, and where collective intelligence leads to breakthrough
              solutions.
            </p>
          </div>
          <div className="bg-card rounded-lg p-8">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-muted-foreground">
              A connected world where problems become opportunities for
              collaboration, innovation thrives through diversity, and solutions
              emerge from the wisdom of crowds.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-muted-foreground">
                We believe the best solutions emerge when diverse minds work
                together, sharing knowledge and perspectives.
              </p>
            </div>
            <div className="text-center">
              <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We encourage creative thinking and unconventional approaches to
                problem-solving, fostering breakthrough ideas.
              </p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-muted-foreground">
                We're building a supportive community where everyone feels
                valued, heard, and empowered to contribute.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-card rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            SolveTogether was born from a simple observation: the most
            challenging problems often require perspectives from multiple
            disciplines, backgrounds, and experiences. Traditional
            problem-solving approaches can be limited by individual knowledge
            and biases.
          </p>
          <p className="text-muted-foreground mb-4">
            We created this platform to break down those barriers and harness
            the collective intelligence of a global community. Whether you're
            facing a technical challenge, a business dilemma, or a personal
            obstacle, our community is here to help.
          </p>
          <p className="text-muted-foreground">
            Today, thousands of problem-solvers from around the world use
            SolveTogether to share challenges, contribute solutions, and learn
            from each other. Together, we're proving that collaboration truly
            makes us stronger.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
