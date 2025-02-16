import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "16fxihs9",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
