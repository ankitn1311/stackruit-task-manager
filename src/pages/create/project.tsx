import React from "react";
import Head from "next/head";
import CreateProject from "../../components/projects/CreateProject";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateProjectFormValuesType,
  CreateProjectValidationSchema,
} from "../../components/functions/types";

const CreateProjectPage = () => {
  const methods = useForm<CreateProjectFormValuesType>({
    defaultValues: {
      chain_ids: [
        {
          value: 0,
        },
      ],
      name: "",
      origins: [
        {
          value: "",
        },
      ],
      rpc_urls: [
        {
          value: "",
        },
      ],
    },
    resolver: yupResolver(CreateProjectValidationSchema),
  });

  return (
    <>
      <Head>
        <title>Create Project</title>
      </Head>
      <FormProvider {...methods}>
        <CreateProject />
      </FormProvider>
    </>
  );
};

export default CreateProjectPage;
