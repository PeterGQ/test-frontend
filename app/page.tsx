// app/page.tsx
import { auth0 } from "./lib/auth0";
import { redirect } from "next/navigation";

export default async function HomePage() {
  // 1. Get the user session
  const session = await auth0.getSession();

  // 2. If the user is not logged in, redirect to the login page
  if (!session?.user) {
    redirect("/auth/login");
  }

  // 3. If the user is logged in, display the home page content
  return (
    redirect("/dashboard")
  );
}