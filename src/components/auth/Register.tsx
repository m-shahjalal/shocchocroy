"use client";
import google from "@/assets/icons/google.png";
import { PAGES } from "@/config/pages";
import { cn } from "@/utils/cn";
import {
  LoginValuesType,
  loginFormSchema,
} from "@/validator/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { signup } from "@/utils/auth.action";

export const Register = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const defaultValues: LoginValuesType = { email: "", password: "" };

  const { handleSubmit, control } = useForm<LoginValuesType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
    reValidateMode: "onChange",
  });

  const handleLogin = (values: LoginValuesType) => {
    startTransition(async () => await signup(values));
  };

  return (
    <div className="bg-gray-300 flex justify-center items-center p-4 h-full">
      <Card className="w-full max-w-md py-6 px-3">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email and password to create a new account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-2"
          >
            <div className="space-y-2">
              <Controller
                control={control}
                name="email"
                render={({
                  field: { name, value, onChange },
                  formState: { errors },
                }) => (
                  <Input
                    name={name}
                    onChange={onChange}
                    value={value}
                    placeholder="m@example.com"
                    required
                    type="email"
                    className={cn(errors.email && "border-red-500")}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                control={control}
                name="password"
                render={({
                  field: { name, value, onChange },
                  formState: { errors },
                }) => (
                  <Input
                    name={name}
                    onChange={onChange}
                    value={value}
                    placeholder="******"
                    required
                    type="password"
                    className={cn(errors.password && "border-red-500")}
                  />
                )}
              />
            </div>
            <Button isLoading={isPending} type="submit" className="w-full">
              Sign Up
            </Button>
            <Link className="text-xs text-right w-full" href={PAGES.LOGIN}>
              Already Registered?
            </Link>
          </form>
          <div className="border-b py-2" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            <Image
              src={google.src}
              className="space-x-2"
              alt="google"
              width={20}
              height={20}
            />
            Sign in with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
