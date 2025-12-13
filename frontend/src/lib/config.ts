export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

export const INTERNAL_API_KEY = process.env.NEXT_PUBLIC_INTERNAL_API_KEY ?? "";

if (!BACKEND_URL) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

if (!INTERNAL_API_KEY) {
  throw new Error("NEXT_PUBLIC_INTERNAL_API_KEY is not defined");
}
