"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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

export default function InterviewList() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://67d555f9d2c7857431f0146c.mockapi.io/vector-interviews/interviews"
      )
      .then((response) => {
        setInterviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching interviews:", error);
        setError("Failed to load interviews. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Interview List</h1>

      <div className="bg-white p-6 rounded shadow-md">
        {/* this shows the loading state of the interviews */}
        {loading && (
          <p className="text-center text-gray-600">Loading interviews...</p>
        )}

        {/* this shows the error message if interviews fail to load */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.length > 0 ? (
                interviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell>{interview.title}</TableCell>
                    <TableCell>{interview.status}</TableCell>
                    <TableCell>
                      {new Date(interview.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3" className="text-center text-gray-500">
                    No interviews available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="mt-6">
        <Link href="/dashboard/create-interview">
          <Button className="bg-green-500 text-white">Create Interview</Button>
        </Link>
      </div>
    </div>
  );
}
