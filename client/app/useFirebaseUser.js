"use client";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useFirebaseUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { user, loading };
}
