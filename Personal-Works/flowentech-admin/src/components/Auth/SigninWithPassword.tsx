"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/store";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SigninWithPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);

      // Check for demo credentials - BYPASS API COMPLETELY
      if (values.email === "admin@demo.com" && values.password === "Demo123!") {
        // Create mock user and token for demo
        const demoUser = {
          username: "Admin Demo",
          email: "admin@demo.com",
          role: "admin",
          access: "all",
        };

        // Create a proper JWT-like token format (header.payload.signature)
        const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
        const payload = btoa(JSON.stringify({
          userId: "demo-user-id",
          email: "admin@demo.com",
          exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)
        }));
        const signature = btoa("demo-signature");
        const mockToken = `${header}.${payload}.${signature}`;

        setUser(demoUser);
        Cookies.set("authToken", mockToken, { expires: 7 });

        toast.success("Demo Login Successfully!");
        setIsLoading(false);

        // Use setTimeout to ensure state updates before navigation
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);

        return;
      }

      // Normal API login for non-demo users
      const response = await axios.post("/api/login", values);
      if (response.status === 200) {
        const { user, token } = response.data;
        setUser(user);
        // Set the token in cookies
        Cookies.set("authToken", token, { expires: 7 });
        router.push("/dashboard");
        toast.success("Signin Successfully!");
      } else {
        toast.error(response.statusText || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white mt-16 xl:mt-0">
      <div className="w-full max-w-md lg:p-8 p-0 space-y-4 bg-white xl:shadow-md shadow-none rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>

        {/* Demo Credentials Box */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">🔐 Demo Credentials:</p>
          <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <p><strong>Email:</strong> admin@demo.com</p>
            <p><strong>Password:</strong> Demo123!</p>
          </div>
        </div>

        <Formik
          initialValues={{ email: "admin@demo.com", password: "Demo123!" }}
          onSubmit={handleSubmit}
          validationSchema={signInSchema}
        >
          {({ isSubmitting }: { isSubmitting: any }) => (
            <Form className="space-y-6">
              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2.5 block font-medium text-dark dark:text-white"
                >
                  Email
                </label>
                <div className="relative">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-2.5 block font-medium text-dark dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="mb-6 flex items-center justify-between gap-2 py-2">
                <label
                  htmlFor="remember"
                  className="flex cursor-pointer select-none items-center font-satoshi text-base font-medium text-dark dark:text-white"
                >
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="peer sr-only"
                  />
                  <span
                    className={`mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5 ${
                      "bg-primary"
                    }`}
                  >
                    <svg
                      width="10"
                      height="7"
                      viewBox="0 0 10 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.70692 0.292787C9.89439 0.480314 9.99971 0.734622 9.99971 0.999786C9.99971 1.26495 9.89439 1.51926 9.70692 1.70679L4.70692 6.70679C4.51939 6.89426 4.26508 6.99957 3.99992 6.99957C3.73475 6.99957 3.48045 6.89426 3.29292 6.70679L0.292919 3.70679C0.110761 3.51818 0.00996641 3.26558 0.0122448 3.00339C0.0145233 2.74119 0.119692 2.49038 0.3051 2.30497C0.490508 2.11956 0.741321 2.01439 1.00352 2.01211C1.26571 2.00983 1.51832 2.11063 1.70692 2.29279L3.99992 4.58579L8.29292 0.292787C8.48045 0.105316 8.73475 0 8.99992 0C9.26508 0 9.51939 0.105316 9.70692 0.292787Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  Remember me
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <div className="mb-4.5">
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
