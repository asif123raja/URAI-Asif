"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        router.push("/dashboard"); // Redirect to dashboard after login
      } else {
        toast.error(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="example@domain.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button className="w-full" type="submit">
            Login
          </Button>

          {/* Google Login Button */}
          <Button
            className="w-full flex items-center justify-center gap-2 mt-2 bg-white text-black border border-gray-300"
            type="button"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="w-5 h-5" /> Login with Google
          </Button>

          {/* Forgot Password & Sign Up */}
          <div className="text-center text-sm text-gray-500 mt-2">
            <Link href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });
//     const [error, setError] = useState<string | null>(null);
//     const router = useRouter();

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);

//         const response = await fetch('/api/users/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             localStorage.setItem('token', data.token);
//             router.push('/dashboard'); // Redirect after login
//         } else {
//             setError(data.message || 'Invalid credentials');
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1 className="text-2xl font-bold">Login</h1>
//             <form onSubmit={handleSubmit} className="flex flex-col w-1/3 mt-5 space-y-4">
//                 <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="p-2 border" />
//                 <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="p-2 border" />
//                 <button type="submit" className="p-2 bg-blue-500 text-white">Login</button>
//             </form>
//             {error && <p className="mt-2 text-red-500">{error}</p>}
//         </div>
//     );
// }