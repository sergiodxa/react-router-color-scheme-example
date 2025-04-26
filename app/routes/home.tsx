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

export default function Home() {
  return (
    <>
      {/* <Welcome /> */}
      <Form navigate={false} method="POST" className="p-10">
        <div className="flex items-center justify-center gap-4">
          <button type="submit" name="color-scheme" value="dark">
            Dark
          </button>
          <button type="submit" name="color-scheme" value="light">
            Light
          </button>
          <button type="submit" name="color-scheme" value="system">
            System
          </button>
        </div>
      </Form>
    </>
  );
}
