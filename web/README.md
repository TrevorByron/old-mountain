# Next.js Tailwind Marketing Starter

Blank starter for a marketing + lead-generation website using Next.js App Router, React, TypeScript, and Tailwind.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Customize

- Main page: `src/app/page.tsx`
- Global tokens/styles: `src/app/globals.css`
- Lead form UI: `src/components/lead-form.tsx`
- Lead provider integration seam: `src/lib/lead-capture.ts`
- Reusable section wrapper: `src/components/marketing/section.tsx`

## Lead capture integration

`submitLead` in `src/lib/lead-capture.ts` is intentionally a stub. Replace with your preferred provider:

- Resend
- Formspree
- HubSpot
- Custom API route
