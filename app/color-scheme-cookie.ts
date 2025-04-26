import { createCookie } from "react-router";
import { createTypedCookie } from "remix-utils/typed-cookie";
import { z } from "zod";

const cookie = createCookie("color-scheme", {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secrets: [process.env.COOKIE_SECRET ?? "secret"],
});

export const schema = z
  .enum(["dark", "light", "system"]) // Possible color schemes
  .default("system") // If there's no cookie, default to "system"
  .catch("system"); // In case of an error, default to "system"

const typedCookie = createTypedCookie({ cookie, schema });

export function getColorScheme(request: Request) {
  const colorScheme = typedCookie.parse(request.headers.get("Cookie"));
  return colorScheme ?? "system"; // Default to "system" if no cookie is found
}

export async function setColorScheme(colorScheme: string) {
  return await typedCookie.serialize(colorScheme);
}
