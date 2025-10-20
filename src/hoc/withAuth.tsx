import React from "react";
import LoginPage from "@/pages/login";
import { useSession } from "@/context/my-auth";
import useProfile from "@/hooks/useProfile";
import Splash from "@/components/partial/Splash";

const Profile = ({ children }: { children: any }) => {
  const { data } = useProfile();
  if (!data) return <Splash />;
  return children;
};

function withAuth<T>(WrappedComponent: any) {
  return function Component(props: any) {
    const session = useSession();
    if (session.state === "loading") return <div />;
    if (Boolean(session?.data?.token)) {
      return (
        <Profile>
          <WrappedComponent {...(props as T)} />
        </Profile>
      );
    }
    return <LoginPage {...props} />;
  };
}

export default withAuth;
