"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setStatus("正在验证管理员身份…");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          typeof payload === "object" &&
          payload !== null &&
          typeof (payload as Record<string, unknown>).error === "string"
            ? String((payload as Record<string, unknown>).error)
            : "登录失败，请稍后重试";
        throw new Error(message);
      }

      setStatus("登录成功，正在进入后台…");
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "登录失败");
      setBusy(false);
    }
  };

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <label>
        <span>管理员邮箱</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="username"
          required
          maxLength={255}
        />
      </label>
      <label>
        <span>密码</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          minLength={3}
          maxLength={72}
        />
      </label>
      <button type="submit" disabled={busy}>
        {busy ? "验证中…" : "进入内容后台"}
      </button>
      <p role="status" aria-live="polite">
        {status || "仅管理员账号可以进入，登录状态保存在安全 Cookie 中。"}
      </p>
    </form>
  );
}
