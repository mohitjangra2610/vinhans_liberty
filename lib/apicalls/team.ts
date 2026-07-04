import type { TeamInsert } from "@/type/supabase";

interface SubmitTeamFormResponse {
  success: boolean;
  error?: string;
  emailError?: string;
}

export type TeamFormPayload = Omit<
  TeamInsert,
  "id" | "tenant_id" | "is_active" | "created_at"
>;

function validateTeamFormPayload(payload: TeamFormPayload): void {
  if (!payload.full_name.trim()) {
    throw new Error("Full name is required.");
  }

  if (!payload.email.trim()) {
    throw new Error("Email is required.");
  }
}

export async function submitTeamForm(
  payload: TeamFormPayload,
): Promise<SubmitTeamFormResponse> {
  validateTeamFormPayload(payload);

  const response = await fetch("/api/team", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: payload.full_name.trim(),
      email: payload.email.trim(),
      phone: payload.phone?.trim() || null,
      message: payload.message?.trim() || null,
    }),
  });

  const result = (await response.json()) as SubmitTeamFormResponse;

  if (!response.ok) {
    throw new Error(result.error || "Failed to submit team form.");
  }

  return result;
}