import React from "react";
import Head from "next/head";
import { yupResolver } from "@hookform/resolvers/yup";
import CreateFunction from "../../components/functions/CreateFunction";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateFunctionFormValuesType,
  CreateFunctionValidationSchema,
} from "../../components/functions/types";

const CreateFunctionHome = () => {
  const methods = useForm<CreateFunctionFormValuesType>({
    resolver: yupResolver(CreateFunctionValidationSchema),
    reValidateMode: "onChange",
  });

  return (
    <>
      <Head>
        <title>Create Function</title>
      </Head>
      <FormProvider {...methods}>
        <CreateFunction />
      </FormProvider>
    </>
  );
};

export default CreateFunctionHome;
