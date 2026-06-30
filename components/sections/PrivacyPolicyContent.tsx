"use client";

import Container from "@/components/layouts/container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrivacyPolicyContent() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-16 bg-white">
      <Container>
        <div className="mx-auto max-w-3xl break-words hyphens-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              <strong>Effective Date:</strong> Dec. 12, 2026&nbsp;|&nbsp;
              <strong>Last Updated:</strong> Mar. 3, 2026
            </p>
          </div>

          {/* Section 1 — Introduction (always visible) */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-4">
              1. Introduction
            </h2>
            <div className="space-y-4 text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
              <p>
                Vinhans Liberty (&quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) operates the website vinhansliberty.com
                (the &quot;Site&quot;). This Privacy Policy explains how we
                collect, use, store, and protect information you provide when
                you visit our Site, fill out a contact or lead form, or apply to
                join our team.
              </p>
              <p>
                This policy applies only to information collected through this
                Site. It does not apply to information collected offline or
                through any other means, including third-party websites linked
                from this Site.
              </p>
              <p>
                By using this Site, you agree to the terms of this Privacy
                Policy.
              </p>
            </div>
          </section>

          <Separator className="mb-8 sm:mb-10" />

          {/* Accordion — Sections 2–5 */}
          <Accordion
            type="multiple"
            defaultValue={["section-2"]}
            className="mb-8 sm:mb-10"
          >
            {/* Section 2 */}
            <AccordionItem value="section-2">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                2. Information We Collect
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p className="mb-4">
                  We collect information you voluntarily provide to us,
                  including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>
                    <strong>Contact information</strong>: full name, email
                    address, phone number
                  </li>
                  <li>
                    <strong>Message content</strong>: any details you submit
                    through our contact, lead generation, or &quot;Join Our
                    Team&quot; application forms
                  </li>
                  <li>
                    <strong>Verification data</strong>: a one-time passcode
                    (OTP) sent to your email address for the purpose of
                    verifying your identity when submitting certain forms
                  </li>
                </ul>
                <p className="mb-4">
                  We do not collect payment card information, Social Security
                  numbers, or financial account numbers through this Site.
                </p>
                <p>
                  We do not use cookies, analytics tools, or third-party
                  tracking scripts on this Site as of the effective date above.
                  If this changes in the future, we will update this policy and,
                  where required by law, obtain your consent.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3 */}
            <AccordionItem value="section-3">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                3. How We Use Your Information
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p className="mb-4">We use the information you provide to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Respond to your inquiries or service requests</li>
                  <li>
                    Verify your identity when you submit a form, via one-time
                    email passcode
                  </li>
                  <li>
                    Process applications submitted through our &quot;Join Our
                    Team&quot; page
                  </li>
                  <li>
                    Contact you about our services, events, or opportunities,
                    where you have not opted out
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4 */}
            <AccordionItem value="section-4">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                4. How We Store and Share Your Information
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p className="mb-4">
                  All information submitted through this Site is stored in our
                  secure database (hosted via Supabase) and is not shared with,
                  sold to, or rented to any third party, including our insurance
                  carrier partners listed on this Site, except:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>
                    Where you explicitly request that we connect you with a
                    specific partner or service
                  </li>
                  <li>Where required by law, subpoena, or legal process</li>
                  <li>
                    Where necessary to protect the rights, property, or safety
                    of Vinhans Liberty, our users, or the public
                  </li>
                </ul>
                <p className="mb-4">
                  We use the following third-party service providers to operate
                  this Site:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Resend</strong> — for sending transactional emails,
                    including OTP verification codes
                  </li>
                  <li>
                    <strong>Supabase</strong> — for secure database storage and
                    hosting
                  </li>
                  <li>
                    <strong>Vercel</strong> — for website hosting and
                    infrastructure
                  </li>
                </ul>
                <p className="mt-4">
                  These providers may process your data solely on our behalf and
                  are contractually restricted from using it for their own
                  purposes.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 5 */}
            <AccordionItem value="section-5">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                5. Data Retention
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p>
                  We retain personal information for as long as necessary to
                  fulfill the purposes outlined in this policy, or as required
                  by applicable law. You may request deletion of your data at
                  any time (see Section 7).
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="mb-8 sm:mb-10" />

          {/* Section 6 — Data Security (always visible) */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-4">
              6. Data Security
            </h2>
            <div className="space-y-4 text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
              <p>
                We take reasonable technical and organizational measures to
                protect your information, including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Encrypted transmission of data (HTTPS/TLS) between your
                  browser and our servers
                </li>
                <li>
                  Access to personally identifiable information limited to
                  personnel who need it to perform their job functions
                </li>
                <li>Secure, access-controlled database hosting</li>
              </ul>
              <p>
                No method of transmission or storage is 100% secure. While we
                strive to protect your information, we cannot guarantee absolute
                security.
              </p>
            </div>
          </section>

          <Separator className="mb-8 sm:mb-10" />

          {/* Section 7 — Your Privacy Rights (always visible) */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-4">
              7. Your Privacy Rights
            </h2>
            <div className="space-y-4 text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
              <p>
                If you are a California resident, you have rights under the
                California Consumer Privacy Act (CCPA/CPRA), including the right
                to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Know</strong> what personal information we have
                  collected about you
                </li>
                <li>
                  <strong>Access</strong> a copy of that information
                </li>
                <li>
                  <strong>Correct</strong> inaccurate personal information
                </li>
                <li>
                  <strong>Delete</strong> personal information we hold about you
                </li>
                <li>
                  <strong>Opt out</strong> of any future marketing
                  communications
                </li>
                <li>
                  <strong>Non-discrimination</strong> for exercising any of
                  these rights
                </li>
              </ul>
              <p>
                Residents of other US states may have similar rights under
                applicable state privacy laws.
              </p>
              <p>
                To exercise any of these rights, contact us using the
                information in Section 9.
              </p>
            </div>
          </section>

          <Separator className="mb-8 sm:mb-10" />

          {/* Accordion — Section 8 */}
          <Accordion type="multiple" className="mb-8 sm:mb-10">
            <AccordionItem value="section-8">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                8. Children&apos;s Privacy
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p>
                  This Site is not directed to individuals under the age of 18.
                  We do not knowingly collect personal information from
                  children. If you believe a child has provided us with personal
                  information, contact us so we can delete it.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="mb-8 sm:mb-10" />

          {/* Section 9 — How to Contact Us (always visible) */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-4">
              9. How to Contact Us
            </h2>
            <div className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground mb-4">
              <p>
                If you have questions about this Privacy Policy or wish to
                exercise your privacy rights, contact us at:
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 sm:p-6 shadow-sm space-y-3 text-base sm:text-lg">
              <p>
                <strong>Email:</strong> Pr@vinhansliberty.com
              </p>
            </div>
          </section>

          <Separator className="mb-8 sm:mb-10" />

          {/* Accordion — Section 10 */}
          <Accordion type="multiple" className="mb-8 sm:mb-10">
            <AccordionItem value="section-10">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                10. Changes to This Policy
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time. The
                  &quot;Last Updated&quot; date at the top of this page reflects
                  the most recent revision. Continued use of the Site after
                  changes are posted constitutes acceptance of the updated
                  policy.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
