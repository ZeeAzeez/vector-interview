import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login"); // Automatically redirect to login
  return null; // Nothing is rendered
}
