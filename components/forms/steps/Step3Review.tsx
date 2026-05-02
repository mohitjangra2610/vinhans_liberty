"use client";

import { Button } from "@/components/ui/button";
import type { BasicForm, Service, ServiceField, Child } from "../LeadForm";

type Props = {
  basicForm: BasicForm;
  selectedService: Service;
  serviceFields: ServiceField[];
  serviceData: Record<string, unknown>;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  submitLoading: boolean;
  submitError: string;
};

function SectionCard({
  title,
  onEdit,
  step,
  children,
}: {
  title: string;
  onEdit: (step: number) => void;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#EAECF0] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 bg-[#F9FAFB] border-b border-[#EAECF0]">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">
          {title}
        </p>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#0a1628] hover:text-[#c9a84c] transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
      </div>
      <div className="px-5 py-4 bg-white divide-y divide-[#F2F4F7]">
        {children}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between py-3 gap-4">
      <span className="text-sm text-[#667085] shrink-0 w-44">{label}</span>
      <span className="text-sm font-medium text-[#101828] text-right">{value || "—"}</span>
    </div>
  );
}

function formatValue(field: ServiceField, value: unknown): React.ReactNode {
  if (!value && value !== 0) return "—";

  if (field.field_type === "children_list") {
    const children = value as Child[];
    if (!children.length) return "—";
    return (
      <div className="space-y-1">
        {children.map((child, i) => (
          <div key={`child-${child.name || i}-${child.age}`} className="inline-flex items-center gap-1.5 bg-[#F2F4F7] rounded-full px-3 py-1 text-xs font-medium text-[#344054]">
            <span>{child.name || `Child ${i + 1}`}</span>
            <span className="text-[#667085]">·</span>
            <span>Age {child.age}</span>
            <span className="text-[#667085]">·</span>
            <span>{child.gender}</span>
          </div>
        ))}
      </div>
    );
  }

  const dollarFields = ["initial_investment", "annual_contribution", "total_outstanding_debts", "annual_household_income"];
  if (dollarFields.includes(field.field_key)) {
    const num = parseFloat(String(value));
    if (!isNaN(num)) return `$${num.toLocaleString()}`;
  }

  if (field.field_key === "investment_timeline") return `${value} year${Number(value) !== 1 ? "s" : ""}`;

  return String(value);
}

export default function Step3Review({
  basicForm,
  selectedService,
  serviceFields,
  serviceData,
  onBack,
  onEdit,
  onSubmit,
  submitLoading,
  submitError,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#101828]">Review Your Details</h2>
        <p className="text-sm text-[#667085] mt-1">
          Please review everything carefully before submitting. You can edit any section.
        </p>
      </div>

      {/* Selected Service Banner */}
      <div className="flex items-center gap-3 rounded-2xl bg-[#0a1628] px-5 py-4">
        <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#c9a84c] font-semibold uppercase tracking-widest mb-0.5">Selected Service</p>
          <p className="text-white font-semibold text-sm truncate">{selectedService.name}</p>
        </div>
        <button
          type="button"
          onClick={() => onEdit(1)}
          className="text-xs text-[#c9a84c] font-semibold hover:underline shrink-0"
        >
          Change
        </button>
      </div>

      {/* Basic Details */}
      <SectionCard title="Personal Information" onEdit={onEdit} step={1}>
        <ReviewRow label="Full Name" value={`${basicForm.first_name} ${basicForm.last_name}`} />
        <ReviewRow label="Email Address" value={basicForm.email} />
        <ReviewRow label="Phone Number" value={basicForm.phone} />
        <ReviewRow label="Age" value={basicForm.age ? `${basicForm.age} years` : "—"} />
        <ReviewRow label="Gender" value={basicForm.gender} />
      </SectionCard>

      {/* Service Data */}
      {serviceFields.length > 0 && (
        <SectionCard title="Service Details" onEdit={onEdit} step={2}>
          {serviceFields.map((field) => (
            <ReviewRow
              key={field.id}
              label={field.label}
              value={formatValue(field, serviceData[field.field_key])}
            />
          ))}
        </SectionCard>
      )}

      {/* Error */}
      {submitError && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      {/* OTP Note */}
      <div className="flex items-start gap-3 rounded-xl bg-[#FFFAEB] border border-[#FEF0C7] px-4 py-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F79009" strokeWidth="2" className="shrink-0 mt-0.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <p className="text-xs text-[#B54708] leading-relaxed">
          Clicking <strong>Submit</strong> will send a verification OTP to{" "}
          <strong>{basicForm.email}</strong>. Your request will be submitted after successful verification.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <Button type="button" variant="outline" className="flex-1 py-6" onClick={onBack} disabled={submitLoading}>
          Back
        </Button>
        <Button
          variant="default"
          className="flex-1 py-6 bg-[#0a1628] hover:bg-[#0a1628]/90 text-white"
          onClick={onSubmit}
          disabled={submitLoading}
        >
          {submitLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Sending OTP...
            </span>
          ) : (
            "Submit & Verify"
          )}
        </Button>
      </div>
    </div>
  );
}