import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from '@/lib';
import removeEmptyValues from '@/utils/removeEmpty';
import _ from 'lodash';
import { TStartup } from '../types';

const payloadProject = (raw: Partial<TStartup>) => {
  const filteredRaw: Partial<TStartup> = removeEmptyValues(raw);
  const newRaw = { ...filteredRaw };
  delete newRaw['banner_url'];
  delete newRaw['body'];
  const content = {
    ...(raw.banner_url && { banner_url: raw.banner_url }),
    ...(raw.body && !_.isEmpty(raw.body) && { body: raw.body }),
  };
  return { ...newRaw, ...(!_.isEmpty(content) && { content }) };
};

export const useSaveStartup = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: Partial<TStartup> }) => {
      const processedPayload = payloadProject(payload);
      console.log('🚀 Original payload:', payload);
      console.log('🚀 Processed payload:', processedPayload);
      return await ws.post({
        url: '/api/v2/user/startup',
        payload: processedPayload,
        // payload,
      });
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['MY_STARTUP']);
      }, 200);
    },
  });
};

export const useSubmitStartup = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: Partial<TStartup> }) => {
      const anyPayload = payload as any;
      const processedPayload = { 
        ...payloadProject(payload), 
        is_oath_accepted: 1,
        // Map registration_no to dti_permit_number if not already provided
        dti_permit_number: anyPayload.dti_permit_number || anyPayload.registration_no || '',
      };
      console.log('🚀 Original payload:', payload);
      console.log('🚀 Processed payload:', processedPayload);
      console.log('🚀 Processed payload keys:', Object.keys(processedPayload));
      console.log('🚀 Processed payload JSON:', JSON.stringify(processedPayload, null, 2));
      return await ws.post({
        url: '/api/v2/user/startup/get_verified',
        payload: processedPayload,
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(['MY_STARTUP'], (prev: any) => {
        return { ...prev, status: 'VERIFIED' };
      });
      setTimeout(() => {
        queryClient.invalidateQueries(['MY_STARTUP']);
      }, 200);
    },
  });
};

export const useResubmitStartup = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: Partial<TStartup> }) =>
      await ws.post({
        url: '/api/v2/user/startup/resubmit',
        payload: { ...payloadProject(payload), is_oath_accepted: 1 },
      }),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['MY_STARTUP']);
      }, 200);
    },
  });
};
