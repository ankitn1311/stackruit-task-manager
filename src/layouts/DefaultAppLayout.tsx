import React, { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { CustomToast } from "@/utils/CustomToast";
import { useCurrentUser } from "@/hooks/state/useCurrentUser";

export const DefaultAppLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const router = useRouter();
  const [, setCurrentUser] = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setLoading(false);
      setCurrentUser(null);
      router.push("/login");
    } catch (err: any) {
      CustomToast.error({
        content: err.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className="font-poppins">
      <div className="flex overflow-auto flex-col">
        {!["/login", "/signup"].includes(router.pathname) && (
          <div
            className="p-2 hover:underline text-red-500 cursor-pointer self-end"
            onClick={() => logout()}>
            {loading ? "logging you out..." : "logout"}
          </div>
        )}
        <main className="flex items-start justify-center flex-1 p-10 ">
          {children}
        </main>
      </div>
    </div>
  );
};
