"use client";

import { useState, useEffect } from "react";
import Step3Review from "./steps/Step3Review";
import Step2ServiceData from "./steps/Step2ServiceData";
import Step1BasicDetails from "./steps/Step1BasicDetails";
import OtpModal from "./steps/OtpModal";
import { getMemoryCachedData } from "@/lib/cache/memory-cache";

export type BasicForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
};

export type ServiceField = {
  id: string;
  label: string;
  field_key: string;
  field_type: string;
  placeholder: string;
  is_required: boolean;
  options: string[] | null;
  sort_order: number;
};

export type Child = {
  name: string;
  age: string;
  gender: string;
};

function getStepLabel(step: number): string {
  if (step === 1) return "Basic Details";
  if (step === 2) return "Service Info";
  return "Review";
}

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceFields, setServiceFields] = useState<ServiceField[]>([]);
  const [basicForm, setBasicForm] = useState<BasicForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });
  const [serviceData, setServiceData] = useState<Record<string, unknown>>({});
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchServices() {
      try {
        const data = await getMemoryCachedData(
          `quote_services:${process.env.NEXT_PUBLIC_TENANT_ID}`,
          600,
          async () => {
            const res = await fetch("/api/get-services");
            if (!res.ok) throw new Error("Failed to load services");
            return res.json();
          },
        );
        if (!cancelled) setServices(data);
      } catch {
        if (!cancelled) setFetchError("Unable to load services. Please try again later.");
      }
    }
    fetchServices();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!selectedService) return;
    const svc = selectedService;
    let cancelled = false;
    async function fetchFields() {
      try {
        const data = await getMemoryCachedData(
          `service_fields:${svc!.id}`,
          600,
          async () => {
            const res = await fetch(
              `/api/get-service-fields?service_id=${svc!.id}`,
            );
            if (!res.ok) throw new Error("Failed to load service fields");
            return res.json();
          },
        );
        if (!cancelled) setServiceFields(data);
        setServiceData({});
      } catch {
        if (!cancelled) setFetchError("Unable to load service details. Please try again.");
      }
    }
    fetchFields();
    return () => { cancelled = true; };
  }, [selectedService]);

  async function handleSubmitClick() {
    setSubmitError("");
    setSubmitLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: basicForm.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      setOtpToken(data.token);
      setShowOtpModal(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong",
      );
    } finally {
      setSubmitLoading(false);
    }
  }

  async function handleOtpVerified() {
    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: basicForm,
          serviceId: selectedService?.id,
          serviceName: selectedService?.name,
          serviceData,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
      setShowOtpModal(false);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor" className="text-success"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Request Submitted!
        </h2>
        <p className="text-muted-foreground text-sm leading-7">
          Thank you for choosing Vinhans Liberty. We have received your
          request and will get back to you with a personalized quotation as soon
          as possible.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      {fetchError && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
          {fetchError}
        </div>
      )}

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all
              ${step === s ? "bg-primary text-primary-foreground border-primary" : ""}
              ${step > s ? "bg-gold text-white border-gold" : ""}
              ${step < s ? "bg-white text-muted-foreground border-border" : ""}
            `}
            >
              {step > s ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                s
              )}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block
              ${step === s ? "text-ink" : "text-muted-foreground"}
            `}
            >
              {getStepLabel(s)}
            </span>
            {s < 3 && (
              <div
                className={`flex-1 h-0.5 ${step > s ? "bg-gold" : "bg-muted"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      {step === 1 && (
        <Step1BasicDetails
          form={basicForm}
          setForm={setBasicForm}
          services={services}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && selectedService && (
        <Step2ServiceData
          service={selectedService}
          fields={serviceFields}
          serviceData={serviceData}
          setServiceData={setServiceData}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && selectedService && (
        <Step3Review
          basicForm={basicForm}
          selectedService={selectedService}
          serviceFields={serviceFields}
          serviceData={serviceData}
          onBack={() => setStep(2)}
          onEdit={(s) => setStep(s)}
          onSubmit={handleSubmitClick}
          submitLoading={submitLoading}
          submitError={submitError}
        />
      )}
      {/* OTP Modal */}
      {showOtpModal && (
        <OtpModal
          email={basicForm.email}
          token={otpToken}
          setToken={setOtpToken}
          onVerified={handleOtpVerified}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </div>
  );
}
