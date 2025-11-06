import { useMutation } from '@tanstack/react-query';
import { queryClient, ws } from '@/lib';
import removeEmptyValues from '@/utils/removeEmpty';
import _ from 'lodash';
import { TStartup } from '../types';

const payloadProject = (raw: Partial<TStartup>) => {
  // Preserve DTI and SEC permit numbers before filtering
  const dtiPermit = (raw as any).dti_permit_number;
  const secPermit = (raw as any).sec_permit_number;
  
  const filteredRaw: Partial<TStartup> = removeEmptyValues(raw);
  const newRaw = { ...filteredRaw };
  delete newRaw['banner_url'];
  delete newRaw['body'];
  
  // Always preserve DTI and SEC permit numbers
  // Only include fields if they have actual values (not empty strings)
  // This prevents Laravel validation issues with empty required_without fields
  if (dtiPermit !== undefined) {
    if (dtiPermit && dtiPermit.trim() !== '') {
      (newRaw as any).dti_permit_number = dtiPermit;
    } else {
      // Send undefined instead of empty string for better Laravel validation
      (newRaw as any).dti_permit_number = undefined;
    }
  }
  if (secPermit !== undefined) {
    if (secPermit && secPermit.trim() !== '') {
      (newRaw as any).sec_permit_number = secPermit;
    } else {
      // Send undefined instead of empty string for better Laravel validation
      (newRaw as any).sec_permit_number = undefined;
    }
  }
  
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
      console.log('🚀 DTI Permit in original:', (payload as any).dti_permit_number);
      console.log('🚀 SEC Permit in original:', (payload as any).sec_permit_number);
      console.log('🚀 Processed payload:', processedPayload);
      console.log('🚀 DTI Permit in processed:', (processedPayload as any).dti_permit_number);
      console.log('🚀 SEC Permit in processed:', (processedPayload as any).sec_permit_number);
      console.log('🚀 Final payload being sent to /api/v2/user/startup:', JSON.stringify(processedPayload, null, 2));
      
      const response = await ws.post({
        url: '/api/v2/user/startup',
        payload: processedPayload,
      });
      
      console.log('🚀 Backend response:', response);
      return response;
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['MY_STARTUP']);
      }, 200);
    },
  });
};

export const useGetVerifiedMutation = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: Partial<TStartup> }) => {
      const processedPayload = { 
        ...payloadProject(payload), 
        is_oath_accepted: 1,
      };
      console.log('🚀 Original payload:', payload);
      console.log('🚀 DTI Permit in original:', (payload as any).dti_permit_number);
      console.log('🚀 SEC Permit in original:', (payload as any).sec_permit_number);
      console.log('🚀 Processed payload:', processedPayload);
      console.log('🚀 DTI Permit in processed:', (processedPayload as any).dti_permit_number);
      console.log('🚀 SEC Permit in processed:', (processedPayload as any).sec_permit_number);
      console.log('🚀 Processed payload keys:', Object.keys(processedPayload));
      console.log('🚀 Processed payload JSON:', JSON.stringify(processedPayload, null, 2));
      return await ws.post({
        url: '/api/v2/user/startup/get_verified',
        payload: processedPayload,
      });
    },
    onSuccess: (response: any, variables) => {
      // Use the response data if available, otherwise use the submitted payload
      const updatedData = response?.data || variables.payload;
      
      queryClient.setQueryData(['MY_STARTUP'], (prev: any) => {
        return { 
          ...prev, 
          ...updatedData,
        };
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
