"use client";

import { useEffect } from "react";
import { useFirebaseUser } from "@/app/useFirebaseUser";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useFirebaseUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/signin");
  }, [loading, user, router]);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  return user ? children : null;
}
