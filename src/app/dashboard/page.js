"use client"; // Required for client-side rendering

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 mt-8">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">7</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Link href="/interview">
          <Button className="bg-blue-500 text-white">
            Go to Interview List
          </Button>
        </Link>
      </div>
    </div>
  );
}
