"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import type { BasicForm, Service } from "../LeadForm";

type Props = {
  form: BasicForm;
  setForm: (form: BasicForm) => void;
  services: Service[];
  selectedService: Service | null;
  setSelectedService: (service: Service) => void;
  onNext: () => void;
};

export default function Step1BasicDetails({
  form,
  setForm,
  services,
  selectedService,
  setSelectedService,
  onNext,
}: Readonly<Props>) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedService) return;
    onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Basic Details</h2>
        <p className="text-sm text-gray-500 mt-1">Tell us about yourself and select a service.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="first_name">First Name</FieldLabel>
          <Input
            id="first_name"
            name="first_name"
            placeholder="John"
            value={form.first_name}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
          <Input
            id="last_name"
            name="last_name"
            placeholder="Doe"
            value={form.last_name}
            onChange={handleChange}
            required
          />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="email">Email Address</FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
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
          placeholder="+1 (555) 000-0000"
          value={form.phone}
          onChange={handleChange}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="age">Age</FieldLabel>
          <Input
            id="age"
            name="age"
            type="number"
            placeholder="Enter your age"
            value={form.age}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="gender">Gender</FieldLabel>
          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full h-10 rounded-md border border-[#D0D5DD] px-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </Field>
      </div>

      {/* Service Selection */}
      <div>
        <FieldLabel>Select a Service</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setSelectedService(service)}
              className={`text-left p-4 rounded-xl border-2 transition-all
                ${selectedService?.id === service.id
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-900 hover:border-blue-300"
                }`}
            >
              <p className={`text-sm font-semibold ${selectedService?.id === service.id ? "text-white" : "text-gray-900"}`}>
                {service.name}
              </p>
              {service.description && (
                <p className={`text-xs mt-1 ${selectedService?.id === service.id ? "text-gray-300" : "text-gray-500"}`}>
                  {service.description}
                </p>
              )}
            </button>
          ))}
        </div>
        {!selectedService && (
          <p className="text-xs text-gray-400 mt-2">Please select a service to continue.</p>
        )}
      </div>

      <Button
        variant="default"
        className="w-full py-6"
        disabled={!selectedService}
      >
        Continue
      </Button>
    </form>
  );
}