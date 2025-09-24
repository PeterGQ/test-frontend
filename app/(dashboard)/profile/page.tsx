// app/profile/page.tsx
import { auth0 } from "../../lib/auth0";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  // Get the user session
  const session = await auth0.getSession();
  const user = session?.user;

  // If the user is not logged in, redirect them to the login page
  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user.name}!</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}