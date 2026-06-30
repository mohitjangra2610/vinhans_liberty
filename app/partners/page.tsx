import Container from "@/components/layouts/container";
import { PartnersPageUI } from "@/components/sections/PartnersPageUI";
import { ArrowRight, Mail, PhoneCall } from "lucide-react";
import Link from "next/link";

import Image from "next/image";
export default function Partners() {
  return (
    <main>
      <section className="flex min-h-55 w-full items-center justify-center gradient-hero px-4 py-10 text-center sm:min-h-65 sm:px-6 lg:px-8">
        <Container>
          <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-bold leading-tight text-foreground sm:text-2xl md:text-2xl">
              Our Partners
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our trusted financial partners help us deliver smarter strategies,
              stronger growth, and lasting client success worldwide.
            </p>
          </div>
        </Container>
      </section>

      <PartnersPageUI />
      <div className="w-full h-fit py-0 px-6 sm:py-0  md:py-6   lg:16">
        <Container>
          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex h-fit w-fit flex-col items-start justify-start">
              <Mail />
              <p className="mt-2 text-lg font-semibold text-foreground">
                Send an email to us
              </p>
              <p className="text-sm font-normal text-muted-foreground">
                Pr@vinhansliberty.com
              </p>

              <Link
                href="mailto:Pr@vinhansliberty.com"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-primary sm:mt-7 sm:text-sm"
              >
                <span>Send an email</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>

            <div className="flex h-fit w-fit flex-col items-start justify-start">
              <Image
                src="/whatsapp.svg"
                alt="whatsapp"
                width={24}
                height={24}
              />

              <p className="mt-2 text-lg font-semibold text-foreground">
                Whatsapp us
              </p>
              <p className="text-sm font-normal text-muted-foreground">(317)602-0574</p>

              <Link
                href="https://wa.me/13176020574"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-primary sm:mt-7 sm:text-sm"
              >
                <span>open whatsapp web</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>

            <div className="flex h-fit w-fit flex-col items-start justify-start">
              <PhoneCall />
              <p className="mt-2 text-lg font-semibold text-foreground">
                Call Us
              </p>
              <p className="text-sm font-normal text-muted-foreground">(317)602-0574</p>

              <Link
                href="tel:+13176020574"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-primary sm:mt-7 sm:text-sm"
              >
                <span>Call now</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
