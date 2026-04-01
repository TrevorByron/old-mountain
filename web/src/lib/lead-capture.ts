export type LeadInput = {
  name: string;
  email: string;
  message?: string;
};

export type LeadCaptureResult = {
  ok: boolean;
  message: string;
};

/**
 * Integration seam for lead capture providers.
 * Replace internals with Formspree, HubSpot, Resend, etc.
 */
export async function submitLead(_input: LeadInput): Promise<LeadCaptureResult> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    ok: true,
    message: "Lead captured locally. Connect your provider in src/lib/lead-capture.ts."
  };
}
