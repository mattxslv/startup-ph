import React, { useEffect } from "react";
import { useSession } from "@/context/my-auth";
import { useRouter } from "next/router";

const RedirectToHome = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/dashboard');
    // eslint-disable-next-line
  }, []);
  return <div />
}

function withPublicOnly<T>(WrappedComponent: any) {
  return function Component(props: any) {
    const session = useSession();
    if (session.state === 'loading') return <div />
    if (!Boolean(session?.data?.token)) {
      return <WrappedComponent {...(props as T)} />;
    }
    return <RedirectToHome />
  }
}

export default withPublicOnly;
