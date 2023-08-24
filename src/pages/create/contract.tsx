import React from "react";

import Head from "next/head";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateContractFormValuesType,
  CreateContractValidationSchema,
} from "../../components/functions/types";
import CreateContract from "../../components/contracts/CreateContract";
import GoBack from "../../components/layout/GoBack";

const CreateContractPage = () => {
  const methods = useForm<CreateContractFormValuesType>({
    resolver: yupResolver(CreateContractValidationSchema),
  });

  return (
    <>
      <Head>
        <title>Create Contract</title>
      </Head>
      <FormProvider {...methods}>
        <CreateContract />
      </FormProvider>
    </>
  );
};

export default CreateContractPage;
