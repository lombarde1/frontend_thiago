"use client";

import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

export default function Register() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}