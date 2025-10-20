import { queryClient, ws } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import useProfile from "./useProfile";
import Toast from "@/ui/toast/Toast";

export const useVerifyRequestEmail = () => {
  const { data: profile } = useProfile();
  return useMutation({
    mutationFn: async () => await ws.post({
      url: '/api/v1/user/request_otp',
      payload: {
        email: profile?.email,
        type: 'ACCOUNT_VERIFICATION',
      },
    }),
    onSuccess: () => {
      Toast.success(`A verification code has been sent to your email address (${profile?.email}).`);
    }
  })
}

export const useVerifyRequestMobile = () => {
  const { data: profile } = useProfile();
  return useMutation({
    mutationFn: async () => await ws.post({
      url: '/api/v1/user/request_otp',
      payload: {
        mobile_no: profile?.mobile_no,
        type: 'ACCOUNT_VERIFICATION',
      },
    }),
    onSuccess: () => {
      Toast.success(`A verification code has been sent to your mobile number (${profile?.mobile_no}).`);
    }
  })
}

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async (payload: { pin: string }) => await ws.put({
      url: '/api/v1/user/verify_email',
      payload,
    }),
    onSuccess: () => {
      Toast.success('Your email is verified!');
      queryClient.invalidateQueries(['PROFILE'])
    }
  })
}
export const useVerifyMobile = () => {
  return useMutation({
    mutationFn: async (payload: { pin: string }) => await ws.put({
      url: '/api/v1/user/verify_mobile_no',
      payload,
    }),
    onSuccess: () => {
      Toast.success('Your mobile is verified!');
      queryClient.invalidateQueries(['PROFILE'])
    }
  })
}
