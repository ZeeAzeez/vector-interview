import { redirect } from "next/navigation";

export default function Home() {
  redirect("/candidate-interview-page"); // Automatically redirect to Dashboard
  return null; // Nothing is rendered
}
