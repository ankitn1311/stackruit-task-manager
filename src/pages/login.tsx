import React from "react";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useController, useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { CustomToast } from "@/utils/CustomToast";
import { useCurrentUser } from "@/hooks/state/useCurrentUser";

export type YupObjectTypeHelper<T> = Partial<Record<keyof T, yup.AnySchema>>;

export type LoginFormValuesType = {
  email?: string;
  password?: string;
};

export const LoginFormValidationSchema = yup.object<
  YupObjectTypeHelper<LoginFormValuesType>
>({
  email: yup.string().email("Not a valid email").required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Enter atleast 8 characters"),
});

const Login = () => {
  const router = useRouter();
  const [, setCurrentUser] = useCurrentUser();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormValuesType>({
    resolver: yupResolver(LoginFormValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    field: { value: email, onChange: onEmailChange },
  } = useController({ name: "email", control });

  const {
    field: { value: password, onChange: onPaswordChange },
  } = useController({ name: "password", control });

  const onSubmit = async (values: LoginFormValuesType) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        values?.email!,
        values?.password!
      );
      setCurrentUser(res.user.uid);
      router.push("/");
    } catch (err: any) {
      CustomToast.error({
        content: err.message,
      });
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-10">
        <div className="text-center text-lg font-semibold uppercase">Login</div>
        <div className="flex w-full  flex-col gap-4">
          <Input
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            label="Email"
            helperText={errors?.email?.message}
          />
          <Input
            value={password}
            onChange={(e) => onPaswordChange(e.target.value)}
            helperText={errors?.password?.message}
            label="Password"
            type="password"
          />
          <Button onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? "Logging you in..." : "Login"}
          </Button>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="">Dont have an account?</div>
          <div
            className="cursor-pointer text-brand-500 hover:underline"
            onClick={() => {
              router.push("/signup");
            }}>
            Signup
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
