"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  email: string;
  token: string;
  setToken: (token: string) => void;
  onVerified: () => void;
  onClose: () => void;
};

export default function OtpModal({ email, token, setToken, onVerified, onClose }: Readonly<Props>) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Auto focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last char
    setOtp(newOtp);
    setError("");

    // Auto move to next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replaceAll(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    // Focus last filled or last input
    const lastIndex = Math.min(pasted.length, 5);
    inputRefs.current[lastIndex]?.focus();
  }

  function handleBackdropKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Enter" || e.key === " ") {
      if (e.target === e.currentTarget) {
        e.preventDefault();
        onClose();
      }
    }
  }

 async function handleVerify() {
  const otpCode = otp.join("");
  if (otpCode.length !== 6) {
    setError("Please enter all 6 digits.");
    return;
  }
  setLoading(true);
  setError("");
  try {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, otp: otpCode, email }), // ← email add kiya
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Invalid OTP");
    onVerified();
  } catch (err) {
    setError(err instanceof Error ? err.message : "Verification failed");
  } finally {
    setLoading(false);
  }
}

  async function handleResend() {
    setResendLoading(true);
    setError("");
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend OTP");
      setToken(data.token);
      setOtp(["", "", "", "", "", ""]);
      setResendCooldown(30);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend");
    } finally {
      setResendLoading(false);
    }
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {/* Modal */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Top bar */}
        <div className="bg-[#0a1628] px-6 pt-6 pb-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-[#c9a84c]/20 flex items-center justify-center mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-white">Verify Your Email</h2>
          <p className="text-sm text-gray-400 mt-1 leading-relaxed">
            We sent a 6-digit code to{" "}
            <span className="text-[#c9a84c] font-medium">{email}</span>
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">

          {/* OTP inputs */}
          <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={`otp-digit-${i}`}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-11 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
                  ${digit ? "border-[#0a1628] bg-[#0a1628]/5 text-[#0a1628]" : "border-[#EAECF0] text-gray-900"}
                  ${error ? "border-red-400 bg-red-50" : ""}
                  focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20
                `}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Verify button */}
          <Button
            className="w-full py-6 bg-[#0a1628] hover:bg-[#0a1628]/90 text-white font-semibold"
            onClick={handleVerify}
            disabled={loading || otp.join("").length !== 6}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify & Submit"
            )}
          </Button>

          {/* Resend */}
          <p className="text-center text-sm text-[#667085]">
            Didn&apos;t receive the code?{" "}
            {resendCooldown > 0 ? (
              <span className="text-[#667085]">
                Resend in <span className="font-semibold text-[#0a1628]">{resendCooldown}s</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className="font-semibold text-[#0a1628] hover:text-[#c9a84c] transition-colors disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}