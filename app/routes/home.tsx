import type { Route } from "./+types/home";
import { data, Form } from "react-router";
import { schema, setColorScheme } from "~/color-scheme-cookie";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  let colorScheme = schema.parse(formData.get("color-scheme"));
  return data(null, {
    headers: { "Set-Cookie": await setColorScheme(colorScheme) },
  });
}

export default function Component() {
  return (
    <>
      <Form navigate={false} method="POST" className="p-10">
        <div className="flex items-center justify-center gap-4">
          <button
            type="submit"
            name="color-scheme"
            value="dark"
            className="rounded-full bg-gray-900 px-4 py-2 text-white dark:bg-gray-100 dark:text-gray-900"
          >
            Dark
          </button>
          <button
            type="submit"
            name="color-scheme"
            value="light"
            className="rounded-full bg-gray-900 px-4 py-2 text-white dark:bg-gray-100 dark:text-gray-900"
          >
            Light
          </button>
          <button
            type="submit"
            name="color-scheme"
            value="system"
            className="rounded-full bg-gray-900 px-4 py-2 text-white dark:bg-gray-100 dark:text-gray-900"
          >
            System
          </button>
        </div>
      </Form>
    </>
  );
}
