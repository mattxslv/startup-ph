import { ws } from '@/lib';
import { useMutation } from '@tanstack/react-query';

export interface IRegisterForm {
  email: string;
  password: string;
  password_confirmation: string;
  pin: string;
  captcha?: string | null;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: IRegisterForm }) =>
      await ws.post({
        url: '/api/v2/user/create-account',
        payload,
        transform: ({ data }) => ({
          token: data?.token,
        }),
      }),
  });
};

export interface IVerifyEmailPayload {
  pin: string;
}

export const sendVerificationEmail = async () => {
  try {
    const res = await ws.post<any>({
      url: '/api/v1/user/send_email_verification',
    });
    return res.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};
