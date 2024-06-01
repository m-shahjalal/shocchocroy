"use client";
import { cn } from "@/lib/cn";
import { signUpWithEmail } from "@/server/action/auth";
import {
  LoginValuesType,
  loginFormSchema,
} from "@/validator/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
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

export const Register = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const defaultValues: LoginValuesType = { email: "", password: "" };

  const methods = useForm<LoginValuesType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
    reValidateMode: "onChange",
  });

  const { handleSubmit } = methods;
  const handleLogin = (values: LoginValuesType) => {
    startTransition(async () => {
      const result = await signUpWithEmail(values);
    });
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
          <Form<LoginValuesType>
            {...methods}
            onSubmit={handleSubmit(handleLogin) as any}
            className="flex flex-col gap-2"
          >
            <div className="space-y-2">
              <Controller
                control={methods.control}
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
                control={methods.control}
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
              Sign in
            </Button>
          </Form>
          <div className="border-b py-2" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            <FcGoogle />
            Sign in with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
