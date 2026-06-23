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

export default function TermsConditionsContent() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-16 bg-white">
      <Container>
        <div className="mx-auto max-w-3xl break-words hyphens-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            
            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              <strong>Effective Date:</strong> Dec. 12,2025 &nbsp;|&nbsp;
              <strong>Last Updated:</strong> Mar. 3,2026
            </p>
          </div>

          {/* Accordion — Sections 1–3 */}
          <Accordion type="multiple" defaultValue={["section-1"]} className="mb-8 sm:mb-10">
            {/* Section 1 */}
            <AccordionItem value="section-1">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                1. Acceptance of Terms
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p>
                  By accessing or using americanwealthcorp.com (the &quot;Site&quot;), you agree to be
                  bound by these Terms &amp; Conditions. If you do not agree, please do not use
                  this Site.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2 */}
            <AccordionItem value="section-2">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                2. Use of the Site
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p>
                  You agree to use this Site only for lawful purposes. You may not use this Site
                  to submit false information, impersonate another person, or attempt to disrupt
                  or compromise the Site&apos;s security or functionality.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3 */}
            <AccordionItem value="section-3">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                3. Intellectual Property
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p>
                  All content on this Site, including text, graphics, logos, and design, is the
                  property of American Wealth Corp or its licensors and may not be copied,
                  reproduced, or distributed without permission.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="mb-8 sm:mb-10" />

          {/* Section 4 — No Financial or Insurance Advice (always visible) */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-4">
              4. No Financial or Insurance Advice
            </h2>
            <div className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
              <p>
                American Wealth Corp is not an insurance carrier and does not provide financial,
                legal, or tax advice. Information on this Site is general in nature and provided
                for informational purposes only. Insurance and financial products referenced on
                this Site are underwritten and provided by licensed third-party carriers
                (including but not limited to AIG, Athene, Nationwide Life, Fidelity &amp;
                Guaranty Life, and Bestow). Any specific advice or product recommendation will
                only come from a licensed agent, and final terms are governed by the applicable
                carrier&apos;s policy documents, not by this Site.
              </p>
            </div>
          </section>

          <Separator className="mb-8 sm:mb-10" />

          {/* Accordion — Section 5 */}
          <Accordion type="multiple" className="mb-8 sm:mb-10">
            <AccordionItem value="section-5">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                5. Events
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p>
                  Information about workshops or events listed on this Site is subject to change.
                  American Wealth Corp is not responsible for cancellations, rescheduling, or
                  venue changes, though we will make reasonable efforts to notify registrants.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="mb-8 sm:mb-10" />

          {/* Section 6 — Join Our Team / No Guarantee (always visible) */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-4">
              6. Join Our Team / No Guarantee
            </h2>
            <div className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
              <p>
                Information submitted through the &quot;Join Our Team&quot; form is an expression of
                interest only and does not constitute an offer of employment, partnership, or
                guaranteed income. Any opportunity discussed is contingent on individual
                qualification, applicable state licensing requirements, and a separate agreement
                to be provided if you proceed. American Wealth Corp does not guarantee income,
                results, or licensing approval for any applicant.
              </p>
            </div>
          </section>

          <Separator className="mb-8 sm:mb-10" />

          {/* Accordion — Sections 7–9 */}
          <Accordion type="multiple" className="mb-8 sm:mb-10">
            {/* Section 7 */}
            <AccordionItem value="section-7">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                7. Limitation of Liability
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p>
                  To the fullest extent permitted by law, American Wealth Corp is not liable for
                  any indirect, incidental, or consequential damages arising from your use of
                  this Site.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 8 */}
            <AccordionItem value="section-8">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                8. Changes to These Terms
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p>
                  We may update these Terms at any time. Continued use of the Site after changes
                  are posted constitutes your acceptance of the revised Terms.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Section 9 */}
            <AccordionItem value="section-9">
              <AccordionTrigger className="text-lg font-bold text-navy py-2 sm:py-3">
                9. Governing Law
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground">
                <p>
                  These Terms are governed by the laws of [INSERT STATE], without regard to
                  conflict-of-law principles.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="mb-8 sm:mb-10" />

          {/* Section 10 — Contact Us (always visible) */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-4">
              10. Contact Us
            </h2>
            <div className="text-base sm:text-lg leading-6 sm:leading-7 text-muted-foreground mb-4">
              <p>Questions about these Terms can be directed to:</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 sm:p-6 shadow-sm space-y-3 text-base sm:text-lg">
              <p>
                <strong>Email:</strong>empowerme@americanwealthcorp.com
              </p>
            </div>
          </section>
        </div>
      </Container>
    </section>
  );
}
