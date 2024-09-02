import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session?.user as User);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth/login");
  };

  const signIn = async (
    email: string,
    password: string,
    redirectTo = "/main"
  ) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error signing in:", error);
    } else {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      router.push(redirectTo);
    }
    setLoading(false);
  };

  return {
    user,
    loading,
    signOut,
    signIn,
  };
}
