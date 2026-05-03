"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import type { Service, ServiceField, Child } from "../LeadForm";

type Props = {
  service: Service;
  fields: ServiceField[];
  serviceData: Record<string, unknown>;
  setServiceData: (data: Record<string, unknown>) => void;
  onBack: () => void;
  onNext: () => void;
};

export default function Step2ServiceData({
  service,
  fields,
  serviceData,
  setServiceData,
  onBack,
  onNext,
}: Readonly<Props>) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(key: string, value: unknown) {
    setServiceData({ ...serviceData, [key]: value });
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.is_required) {
        const val = serviceData[field.field_key];
        if (!val || (Array.isArray(val) && val.length === 0)) {
          newErrors[field.field_key] = `${field.label} is required`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (validate()) onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{service.name}</h2>
        <p className="text-sm text-gray-500 mt-1">
          Please provide details for your selected service.
        </p>
      </div>

      {fields.map((field) => (
        <div key={field.id}>
          {field.field_type === "text" && (
            <Field>
              <FieldLabel htmlFor={field.field_key}>
                {field.label}
                {!field.is_required && (
                  <span className="text-gray-400 font-normal ml-1">(optional)</span>
                )}
              </FieldLabel>
              <Input
                id={field.field_key}
                placeholder={field.placeholder || ""}
                value={(serviceData[field.field_key] as string) || ""}
                onChange={(e) => handleChange(field.field_key, e.target.value)}
              />
              {errors[field.field_key] && (
                <p className="text-xs text-red-500 mt-1">{errors[field.field_key]}</p>
              )}
            </Field>
          )}

          {field.field_type === "number" && (
            <Field>
              <FieldLabel htmlFor={field.field_key}>
                {field.label}
                {field.field_key === "investment_timeline" && (
                  <span className="text-gray-400 font-normal ml-1">(1-20 years)</span>
                )}
              </FieldLabel>
              <Input
                id={field.field_key}
                type="number"
                placeholder={field.placeholder || ""}
                value={(serviceData[field.field_key] as string) || ""}
                min={field.field_key === "investment_timeline" ? 1 : undefined}
                max={field.field_key === "investment_timeline" ? 20 : undefined}
                onChange={(e) => handleChange(field.field_key, e.target.value)}
              />
              {errors[field.field_key] && (
                <p className="text-xs text-red-500 mt-1">{errors[field.field_key]}</p>
              )}
            </Field>
          )}

          {field.field_type === "select" && field.options && (
            <Field>
              <FieldLabel htmlFor={field.field_key}>{field.label}</FieldLabel>
              <select
                id={field.field_key}
                value={(serviceData[field.field_key] as string) || ""}
                onChange={(e) => handleChange(field.field_key, e.target.value)}
                className="w-full h-10 rounded-md border border-[#D0D5DD] px-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              >
                <option value="">Select an option</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors[field.field_key] && (
                <p className="text-xs text-red-500 mt-1">{errors[field.field_key]}</p>
              )}
            </Field>
          )}

          {field.field_type === "children_list" && (
            <ChildrenListField
              label={field.label}
              fieldKey={field.field_key}
              value={(serviceData[field.field_key] as Child[]) || []}
              onChange={(val) => handleChange(field.field_key, val)}
              error={errors[field.field_key]}
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1 py-6"
          onClick={onBack}
        >
          Back
        </Button>
        <Button variant="default" className="flex-1 py-6">
          Continue
        </Button>
      </div>
    </form>
  );
}

// Children List Component
function ChildrenListField({
  label,
  fieldKey,
  value,
  onChange,
  error,
}: Readonly<{
  label: string;
  fieldKey: string;
  value: Child[];
  onChange: (val: Child[]) => void;
  error?: string;
}>) {
  function addChild() {
    onChange([...value, { name: "", age: "", gender: "" }]);
  }

  function removeChild(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function updateChild(index: number, key: keyof Child, val: string) {
    const updated = [...value];
    updated[index] = { ...updated[index], [key]: val };
    onChange(updated);
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="space-y-3 mt-2">
        {value.map((child, i) => (
          <div
            key={`child-${i}`}
            className="border border-[#EAECF0] rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">Child {i + 1}</p>
              <button
                type="button"
                onClick={() => removeChild(i)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Field>
                <FieldLabel htmlFor={`${fieldKey}_name_${i}`}>Name</FieldLabel>
                <Input
                  id={`${fieldKey}_name_${i}`}
                  placeholder="Name"
                  value={child.name}
                  onChange={(e) => updateChild(i, "name", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={`${fieldKey}_age_${i}`}>Age</FieldLabel>
                <Input
                  id={`${fieldKey}_age_${i}`}
                  type="number"
                  placeholder="Age"
                  value={child.age}
                  onChange={(e) => updateChild(i, "age", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={`${fieldKey}_gender_${i}`}>Gender</FieldLabel>
                <select
                  id={`${fieldKey}_gender_${i}`}
                  value={child.gender}
                  onChange={(e) => updateChild(i, "gender", e.target.value)}
                  className="w-full h-10 rounded-md border border-[#D0D5DD] px-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addChild}
          className="w-full py-3 border-2 border-dashed border-[#EAECF0] rounded-xl text-sm text-gray-500 hover:border-[#0a1628] hover:text-[#0a1628] transition-all"
        >
          + Add Child
        </button>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}