/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import { AppPropsWithLayout } from "../types";
import { DefaultAppLayout } from "../layouts/DefaultAppLayout";
import { toastDefaultOptions } from "@/utils/toast";
import { Toaster } from "react-hot-toast";
import { auth } from "@/utils/firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/state/useCurrentUser";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [, setCurrentUser] = useCurrentUser();
  const AppLayout =
    Component.getLayout ??
    ((page) => <DefaultAppLayout>{page}</DefaultAppLayout>);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
        router.push("/");
      } else {
        setCurrentUser(null);
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Toaster position="top-center" toastOptions={toastDefaultOptions} />
      {AppLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
