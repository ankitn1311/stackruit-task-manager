import React from "react";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useController, useForm } from "react-hook-form";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/router";
import { CustomToast } from "@/utils/CustomToast";
import { useCurrentUser } from "@/hooks/state/useCurrentUser";

/** TYPES */

export type YupObjectTypeHelper<T> = Partial<Record<keyof T, yup.AnySchema>>;

export type SignupFormValuesType = {
  email?: string;
  password?: string;
  name?: string;
};

/** Schema */

export const SignupFormValidationSchema = yup.object<
  YupObjectTypeHelper<SignupFormValuesType>
>({
  email: yup.string().email("Not a valid email").required("Required"),
  name: yup.string().required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Enter atleast 8 characters"),
});

/*** Component start */

const Signup = () => {
  const router = useRouter();
  const [, setCurrentUser] = useCurrentUser();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignupFormValuesType>({
    resolver: yupResolver(SignupFormValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const {
    field: { value: name, onChange: onNameChange },
  } = useController({ name: "name", control });

  const {
    field: { value: email, onChange: onEmailChange },
  } = useController({ name: "email", control });

  const {
    field: { value: password, onChange: onPaswordChange },
  } = useController({ name: "password", control });

  const onSubmit = async (values: SignupFormValuesType) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values?.email!,
        values?.password!
      );
      const user = res.user;
      setCurrentUser(res.user.uid);
      await updateProfile(user, {
        displayName: values?.name!,
      });
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
        <div className="text-center text-lg font-semibold uppercase">
          Signup
        </div>
        <div className="flex w-full  flex-col gap-4">
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            label="Name"
            helperText={errors?.name?.message}
          />
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
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Signing you up..." : "Signup"}
          </Button>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="">Already have an account?</div>
          <div
            className="cursor-pointer text-brand-500 hover:underline"
            onClick={() => {
              router.push("/login");
            }}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
