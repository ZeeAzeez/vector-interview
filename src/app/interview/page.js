"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const interviews = [
  {
    id: 1,
    title: "Frontend Developer Interview",
    status: "Scheduled",
    date: "2025-03-10",
  },
  {
    id: 2,
    title: "Backend Developer Interview",
    status: "Completed",
    date: "2025-03-08",
  },
  {
    id: 3,
    title: "Fullstack Developer Interview",
    status: "Scheduled",
    date: "2025-03-15",
  },
  {
    id: 4,
    title: "Product Manager Interview",
    status: "Pending",
    date: "2025-03-07",
  },
];

export default function Interview() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Interview List</h1>

      <div className="bg-white p-6 rounded shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviews.map((interview) => (
              <TableRow key={interview.id}>
                <TableCell>{interview.title}</TableCell>
                <TableCell>{interview.status}</TableCell>
                <TableCell>{interview.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <Link href="/dashboard/create-interview">
          <Button className="bg-green-500 text-white">Create Interview</Button>
        </Link>
      </div>
    </div>
  );
}
