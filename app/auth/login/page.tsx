"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation"; // 新增

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter(); // 新增
  const searchParams = useSearchParams(); // 新增
  const redirectTo = searchParams.get("redirectTo") ?? "/";

  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [searchParams]);

  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else if (!data.user?.email_confirmed_at) {
      setError("邮箱未验证，请检查您的邮箱。");
    } else {
      router.push(redirectTo); // 登录成功后跳转到指定页面
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="p-4 border rounded w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">登录</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <Input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <Button onClick={handleLogin} className="w-full mb-2">
          登录
        </Button>
        <Button
          variant="link"
          onClick={() => router.push(`/auth/register?redirectTo=${redirectTo}`)}
          className="w-full"
        >
          没有账号？去注册
        </Button>
      </div>
    </div>
  );
}
