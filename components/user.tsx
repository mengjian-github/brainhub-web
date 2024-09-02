import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { CircleUserRound } from "lucide-react";

export default function User({ isExpanded }: { isExpanded: boolean }) {
  const { user, signOut, loading } = useAuth(); // 从 useAuth 中获取 loading 状态
  const router = useRouter();

  if (loading) {
    return isExpanded ? (
      <div className="flex items-center space-x-4">
        <CircleUserRound />
        <p>加载中...</p>
      </div>
    ) : null;
  }

  if (!user) {
    return isExpanded ? (
      <div className="flex items-center space-x-4">
        <Button className="w-full" onClick={() => router.push("/auth/login")}>
          登录
        </Button>
      </div>
    ) : null;
  }

  return (
    <div className="flex items-center space-x-4">
      <CircleUserRound />
      {isExpanded && (
        <div>
          <p className="text-sm font-medium text-gray-800">
            欢迎, {user.email}
          </p>
          <a
            onClick={() => signOut()}
            className="text-xs text-gray-500 hover:text-red-500 cursor-pointer"
          >
            登出
          </a>
        </div>
      )}
    </div>
  );
}
