import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard"); // Automatically redirect to Dashboard
  return null; // Nothing is rendered
}
