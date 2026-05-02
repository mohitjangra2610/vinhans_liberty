"use client";

import { useState, useRef, useEffect } from "react";
import { submitTeamForm } from "@/lib/apicalls/team";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Field, FieldLabel } from "../ui/field";

export function JoinTeam() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpToken, setOtpToken] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape" && showOtpModal) {
        setShowOtpModal(false);
        setOtp(["", "", "", "", "", ""]);
        setOtpError("");
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [showOtpModal]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setOtpToken(data.token);
      setShowOtpModal(true);
      setResendCooldown(30);
      setOtp(["", "", "", "", "", ""]);
      setOtpError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replaceAll(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  async function handleVerifyOtp() {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setOtpError("Please enter all 6 digits");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const verifyRes = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: otpValue,
          token: otpToken,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || "Invalid OTP");

      await submitTeamForm(form);

      setSuccess(true);
      setShowOtpModal(false);
      setForm({ full_name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setOtpLoading(false);
    }
  }

  function handleCancelModal() {
    setShowOtpModal(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    setOtpError("");
    setResendCooldown(30);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOtpToken(data.token);
    } catch {
      setOtpError("Failed to resend OTP");
    }
  }

  return (
    <section id="join-team" className="w-full bg-white py-16 scroll-mt-24">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-start">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl sm:text-md lg:text-2xl font-bold text-gray-900">
            Join Our Team
          </h3>
          <p className="text-base leading-7 text-[#344054]">
            Are you driven and coachable? Join US as a financial services
            entrepreneur. Training provided. No experience necessary. Apply from
            anywhere in US and Canada. 100% remote possible. Assistance and
            training provided to get licensed.
          </p>
          <p className="text-sm text-[#667085] italic">*Conditions apply</p>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-sm"
        >
          <Field>
            <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
            <Input
              id="full_name"
              name="full_name"
              placeholder="Enter your full name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea
              id="message"
              name="message"
              placeholder="Write your message (optional)"
              value={form.message}
              onChange={handleChange}
              rows={4}
            />
          </Field>

          <Button
            variant="default"
            className="w-full py-6"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Submit"}
          </Button>

          {success && (
            <p className="text-sm text-green-600 text-center">
              Your request has been submitted successfully.
            </p>
          )}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
        </form>
      </div>

      {/* OTP MODAL */}
      {showOtpModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onKeyDown={(e) => { if (e.key === "Escape") setShowOtpModal(false); }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowOtpModal(false); }}
          tabIndex={-1}
        >
          <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-xl p-8 w-full max-w-md mx-4" role="dialog" aria-modal="true" aria-labelledby="otp-modal-title">
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h2
                id="otp-modal-title"
                className="text-lg font-semibold text-gray-900"
              >
                Verify your email
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-gray-700">{form.email}</span>
              </p>
            </div>

            {/* OTP Boxes */}
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, i) => (
                <input
                  key={`otp-box-${i}`}
                  ref={(el) => {
                    otpRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onPaste={handleOtpPaste}
                  className="w-11 text-center text-xl font-semibold border border-[#D0D5DD] rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  style={{ height: "52px" }}
                />
              ))}
            </div>

            {otpError && (
              <p className="text-sm text-red-500 text-center mb-4">
                {otpError}
              </p>
            )}

            <Button
              variant="default"
              className="w-full py-5"
              onClick={handleVerifyOtp}
              disabled={otpLoading}
            >
              {otpLoading ? "Verifying..." : "Verify & Submit"}
            </Button>

            <Button
              variant="outline"
              className="w-full py-5 mt-3"
              onClick={handleCancelModal}
              disabled={otpLoading}
            >
              Cancel — Form not submitted
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Didn&apos;t receive it?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="text-blue-600 underline disabled:text-gray-400 disabled:no-underline"
              >
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend OTP"}
              </button>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}