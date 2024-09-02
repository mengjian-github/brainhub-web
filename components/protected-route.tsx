import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo: string;
}

export default function ProtectedRoute({
  children,
  redirectTo,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Button onClick={() => router.push(redirectTo)}>登录以继续</Button>
      </div>
    );
  }

  return <>{children}</>;
}
