import { ws } from "@/lib";
import { useMutation } from "@tanstack/react-query";

function useAuthenticate() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) =>
      await ws.post<"VERIFIED" | "UNVERIFIED">({
        url: "/api/v2/user/email_sign_in",
        payload: { email },
        transform: (res) => {
          // Handle both possible response structures
          return res?.data?.data?.status || res?.data?.status;
        },
      }),
  });
}

export default useAuthenticate;
