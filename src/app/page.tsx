import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { ArrowUpRight, CheckCircle2, Shield, Users, Zap } from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join a community where challenges become opportunities for
              collaborative problem-solving and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Post Challenges",
                description:
                  "Share your problems with detailed descriptions and tags",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Community Input",
                description:
                  "Get diverse perspectives from problem-solvers worldwide",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Vote & Validate",
                description:
                  "Community votes elevate the best solutions to the top",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Track Progress",
                description:
                  "Monitor your challenges and solutions in one place",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Challenges Solved</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div className="text-blue-100">Active Problem Solvers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Solution Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Solve Together?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of problem-solvers who are making a difference
            through collaborative innovation.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Join the Community
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
