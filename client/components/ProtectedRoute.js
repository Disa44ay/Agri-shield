"use client";

import { useEffect } from "react";
import { useFirebaseUser } from "@/app/useFirebaseUser";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useFirebaseUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/signin");
  }, [loading, user, router]);

  if (loading) return <Loading></Loading>;

  return user ? children : null;
}
