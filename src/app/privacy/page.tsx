import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, Cookie, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your personal information when you use
            SolveTogether.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: January 2025
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="w-6 h-6 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Information</h3>
                <p className="text-muted-foreground text-sm">
                  When you create an account, we collect your email address,
                  name, and any profile information you choose to provide.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Content You Create</h3>
                <p className="text-muted-foreground text-sm">
                  We store the challenges you post, solutions you contribute,
                  votes you cast, and comments you make on our platform.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Usage Data</h3>
                <p className="text-muted-foreground text-sm">
                  We collect information about how you use our platform,
                  including pages visited, features used, and interaction
                  patterns.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technical Information</h3>
                <p className="text-muted-foreground text-sm">
                  We automatically collect IP addresses, browser type, device
                  information, and other technical data for security and
                  performance purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Platform Operation</h3>
                <p className="text-muted-foreground text-sm">
                  To provide and maintain our services, process your requests,
                  and enable community interactions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Communication</h3>
                <p className="text-muted-foreground text-sm">
                  To send you important updates, respond to your inquiries, and
                  notify you about relevant platform activity.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Improvement</h3>
                <p className="text-muted-foreground text-sm">
                  To analyze usage patterns, improve our features, and develop
                  new functionality based on user needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Safety & Security</h3>
                <p className="text-muted-foreground text-sm">
                  To protect our platform, prevent abuse, and ensure a safe
                  environment for all users.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Public Content</h3>
                <p className="text-muted-foreground text-sm">
                  Challenges, solutions, and profile information you choose to
                  make public are visible to other users and may be indexed by
                  search engines.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Service Providers</h3>
                <p className="text-muted-foreground text-sm">
                  We may share information with trusted third-party service
                  providers who help us operate our platform, subject to strict
                  confidentiality agreements.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Legal Requirements</h3>
                <p className="text-muted-foreground text-sm">
                  We may disclose information when required by law, to protect
                  our rights, or to ensure user safety.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Business Transfers</h3>
                <p className="text-muted-foreground text-sm">
                  In the event of a merger, acquisition, or sale of assets, user
                  information may be transferred as part of the transaction.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                We implement industry-standard security measures to protect your
                personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication requirements</li>
                <li>Secure hosting infrastructure with reputable providers</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
              <p className="text-muted-foreground text-sm">
                While we strive to protect your information, no method of
                transmission over the internet is 100% secure. We cannot
                guarantee absolute security but are committed to protecting your
                data.
              </p>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Cookie className="w-6 h-6 text-primary" />
                Cookies and Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground text-sm">
                  We use cookies necessary for platform functionality, including
                  authentication, security, and user preferences.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-muted-foreground text-sm">
                  We use analytics tools to understand how users interact with
                  our platform and improve our services.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cookie Control</h3>
                <p className="text-muted-foreground text-sm">
                  You can control cookie settings through your browser, though
                  disabling certain cookies may affect platform functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm mb-4">
                Depending on your location, you may have the following rights
                regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                <li>Access: Request a copy of your personal information</li>
                <li>
                  Correction: Request correction of inaccurate information
                </li>
                <li>Deletion: Request deletion of your personal information</li>
                <li>
                  Portability: Request transfer of your data to another service
                </li>
                <li>
                  Restriction: Request limitation of processing activities
                </li>
                <li>Objection: Object to certain processing activities</li>
              </ul>
              <p className="text-muted-foreground text-sm mt-4">
                To exercise these rights, please contact us using the
                information provided below.
              </p>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                We retain your personal information for as long as necessary to
                provide our services and fulfill the purposes outlined in this
                policy. Specific retention periods include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                <li>Account information: Until account deletion</li>
                <li>
                  Public content: May remain visible after account deletion
                </li>
                <li>Usage data: Typically 2-3 years for analytics purposes</li>
                <li>Legal compliance: As required by applicable laws</li>
              </ul>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Our platform is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13. If we become aware that we have collected such
                information, we will take steps to delete it promptly.
              </p>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card>
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place to protect your information in accordance with this
                privacy policy and applicable laws.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                We may update this privacy policy from time to time. We will
                notify you of any material changes by posting the new policy on
                this page and updating the "Last updated" date. We encourage you
                to review this policy periodically.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                If you have any questions about this privacy policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> privacy@solvetogether.com
                </p>
                <p>
                  <strong>Address:</strong> SolveTogether Inc., 123 Innovation
                  Drive, San Francisco, CA 94105
                </p>
                <p>
                  <strong>Data Protection Officer:</strong>{" "}
                  dpo@solvetogether.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
