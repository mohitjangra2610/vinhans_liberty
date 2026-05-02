"use client";

import Container from "@/components/layouts/container";
import { ArrowRight, Mail, PhoneCall } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Contact() {
  return (
    <main>
      <section className="flex min-h-55 w-full items-center justify-center bg-linear-60 from-yellow-50 via-blue-50 to-red-50 px-4 py-10 text-center sm:min-h-65 sm:px-6 lg:px-8">
        <Container>
          <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
              Contact Us
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg">
              Get clarity on your goals, explore personalized strategies, and
              ask anything. This call is built entirely around your financial
              needs.
            </p>
          </div>
        </Container>
      </section>

      <section className="w-full px-6 py-6">
        <Container>
          <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex flex-col items-start">
              <Mail />
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Send an email to us
              </p>
              <p className="text-sm font-normal text-gray-600">
                info@amaricanwealthcrop.com
              </p>

              <Link
                href="mailto:info@amaricanwealthcrop.com"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-blue-700 sm:mt-7 sm:text-sm"
              >
                <span>Send an email</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col items-start">
              <Image
                src="/whatsapp.svg"
                alt="Whatsapp"
                width={24}
                height={24}
              />

              <p className="mt-2 text-lg font-semibold text-gray-800">
                Whatsapp us
              </p>
              <p className="text-sm font-normal text-gray-600">
                (317) 602-0574
              </p>

              <Link
                href="https://wa.me/13176020574"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-blue-700 sm:mt-7 sm:text-sm"
              >
                <span>Open WhatsApp Web</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col items-start">
              <PhoneCall />
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Call Us
              </p>
              <p className="text-sm font-normal text-gray-600">
                (317) 602-0574
              </p>

              <Link
                href="tel:+13176020574"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-blue-700 sm:mt-7 sm:text-sm"
              >
                <span>Call now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="h-screen w-full">
        <iframe
          src="https://calendly.com/sonu-website26/30min"
          className="h-full w-full border-0"
          title="Calendly booking"
          allowFullScreen
        />
      </section>
    </main>
  );
}