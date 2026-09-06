/** Public path for the B1 sample PDF already committed under `public/`. */
export const SAMPLE_PDF_PATH = "/Happy-House-Plants-Free-Sample.pdf";

export const SAMPLE_PDF_FILENAME = "Happy-House-Plants-Free-Sample.pdf";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value) && value.length <= 254;
}
