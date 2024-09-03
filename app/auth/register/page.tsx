"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation"; // 新增
import { toast } from "react-hot-toast"; // 新增
import { Suspense } from "react";

// 新组件用于处理 useSearchParams
function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter(); // 新增
  const searchParams = useSearchParams(); // 新增
  const redirectTo = searchParams.get("redirectTo"); // 新增

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      toast.success("注册成功，请登录您的账号");
      router.push(`/auth/login?redirectTo=${redirectTo}&email=${email}`); // 注册成功后跳转到登录页面并回填邮箱
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="p-4 border rounded w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">注册</h2>
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
        <Button onClick={handleRegister} className="w-full mb-2">
          注册
        </Button>
        <Button
          variant="link"
          onClick={() => router.push(`/auth/login?redirectTo=${redirectTo}`)}
          className="w-full"
        >
          已有账号？去登录
        </Button>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
