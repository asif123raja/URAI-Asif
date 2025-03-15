// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SignupPage() {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         password: '',
//         country: '',
//         phoneNumber: '',
//         address: '',
//     });
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<string | null>(null);
//     const router = useRouter();

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess(null);

//         const response = await fetch('/api/users/signup', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             setSuccess('User registered successfully! Redirecting...');
//             setTimeout(() => router.push('/login'), 2000);
//         } else {
//             setError(data.message || 'Something went wrong');
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1 className="text-2xl font-bold">Sign Up</h1>
//             <form onSubmit={handleSubmit} className="flex flex-col w-1/3 mt-5 space-y-4">
//                 <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="p-2 border" />
//                 <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="p-2 border" />
//                 <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="p-2 border" />
//                 <input type="text" name="country" placeholder="Country" onChange={handleChange} required className="p-2 border" />
//                 <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required className="p-2 border" />
//                 <input type="text" name="address" placeholder="Address" onChange={handleChange} required className="p-2 border" />
//                 <button type="submit" className="p-2 bg-blue-500 text-white">Sign Up</button>
//             </form>
//             {error && <p className="mt-2 text-red-500">{error}</p>}
//             {success && <p className="mt-2 text-green-500">{success}</p>}
//         </div>
//     );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const registerSchema = z.object({
  full_name: z.string().min(3, "Full Name must have at least 3 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Must contain an uppercase letter.")
    .regex(/[a-z]/, "Must contain a lowercase letter.")
    .regex(/[0-9]/, "Must contain a number.")
    .regex(/[\W_]/, "Must contain a special character."),
  country: z.string().min(2, "Country must be specified."),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms."),
});

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.full_name,
          email: values.email,
          password: values.password,
          country: values.country,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      toast.success("Signup successful! Please check your email for verification.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
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

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter a strong password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms Checkbox */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>I agree to the terms & conditions</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          {/* Google Signup Button */}
          <Button
            className="w-full flex items-center justify-center gap-2 mt-2 bg-white text-black border border-gray-300"
            type="button"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="w-5 h-5" /> Sign up with Google
          </Button>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
