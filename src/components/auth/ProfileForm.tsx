import * as yup from 'yup';
import useProfile, { EXTENSION_NAMES, GENDER_OPTIONS, IProfile } from '@/hooks/useProfile';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import React from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { validateMobileNumber } from '@/validations';
import { useRouter } from 'next/router';
import InputSelect from '@/ui/form/InputSelect';
import InputMobile from '@/ui/form/InputMobile';
// import { COUNTRY_OPTIONS, SOCIAL_CLASSIFICATION_OPTIONS } from '@/lookups';
import { confirmAlert } from '../confirm-alert';
// import _, { isEmpty } from 'lodash';
import Toast from '@/ui/toast/Toast';
import InputDateV2 from '@/ui/form/InputDateV2';
import { getPreviousYear } from '@/utils/getPreviousYears';

interface Props {
  backLabel?: string;

  submitLabel?: string;
  onSuccess: () => void;
  note?: string;
  // allFields?: boolean;
}

const validationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('Required')
    .max(255, 'First name must be at most 255 characters')
    .matches(/^[a-zA-Z\s-.ñÑ]*$/, 'Must be available in character only'),
  middle_name: yup
    .string()
    .max(255, 'Middle name must be at most 255 characters')
    .matches(/^[a-zA-Z\s-.ñÑ]*$/, 'Must be available in character only'),
  last_name: yup
    .string()
    .required('Required')
    .max(255, 'Last name must be at most 255 characters')
    .matches(/^[a-zA-Z\s-.ñÑ]*$/, 'Must be available in character only'),
  mobile_no: validateMobileNumber().required('Required'),
  birth_date: yup.string().required('Required'),
});

// const TYPE_OPTIONS: TSelectOptions[] = [
//   { label: 'As a Start up', value: 'STARTUP' },
//   { label: 'As an Aspiring Individual', value: 'INDIVIDUAL' },
// ]
const getInitForm = (): Partial<IProfile> => ({
  first_name: sessionStorage.getItem('first_name') || '',
  middle_name: sessionStorage.getItem('middle_name') || '',
  last_name: sessionStorage.getItem('last_name') || '',
  suffix_name: sessionStorage.getItem('suffix_name') || '',
  gender: sessionStorage.getItem('gender') || '',
  birth_date: sessionStorage.getItem('birth_date') || '',
  mobile_no: sessionStorage.getItem('mobile_no') || '',
});
function ProfileForm({
  onSuccess,
  note,
  backLabel = 'Cancel',
  submitLabel = 'Continue',
}: // allFields = false,
Props) {
  const router = useRouter();
  const { data: initProfile } = useProfile();
  const mutator = useUpdateProfile();
  const handleSubmit = (payload: IProfile) => {
    sessionStorage.setItem('first_name', payload.first_name);
    sessionStorage.setItem('middle_name', payload.middle_name);
    sessionStorage.setItem('last_name', payload.last_name);
    sessionStorage.setItem('suffix_name', payload.suffix_name);
    sessionStorage.setItem('gender', payload.gender === 'N/A' ? '' : payload.gender);
    sessionStorage.setItem('birth_date', payload.birth_date);
    sessionStorage.setItem('mobile_no', payload.mobile_no);
    mutator.mutate(
      { payload },
      {
        onSuccess,
        onError: (err: any) => {
          const errors = Object.values(err?.errors)[0];
          if (!errors || !Array.isArray(errors)) Toast.error('Something went wrong');
          Toast.error((errors as Array<string>).join(', '));
        },
      }
    );
  };
  return (
    <>
      <Form
        className='flex-1 flex flex-col'
        initialValues={/* initProfile || */ getInitForm()}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <div className='space-y-3 mb-6'>
          <div>
            <Input
              name='first_name'
              label='First Name'
              required
              disabled={initProfile?._is_profile_from_sso}
              className='uppercase'
            />
          </div>
          <div>
            <Input
              name='middle_name'
              label='Middle Name'
              // required
              disabled={initProfile?._is_profile_from_sso}
              className='uppercase'
            />
          </div>
          <div>
            <Input
              name='last_name'
              label='Last Name'
              required
              disabled={initProfile?._is_profile_from_sso}
              className='uppercase'
            />
          </div>
          <div>
            <InputSelect
              name='suffix_name'
              label='Extension Name'
              options={EXTENSION_NAMES}
              disabled={initProfile?._is_profile_from_sso}
            />
          </div>
          <div>
            <InputSelect
              name='gender'
              label='Sex'
              options={GENDER_OPTIONS}
              disabled={initProfile?._is_profile_from_sso}
            />
          </div>
          <div>
            <InputDateV2
              name='birth_date'
              label='Birth Date'
              required
              disabled={initProfile?._is_profile_from_sso}
              maxDate={getPreviousYear(15)}
            />
          </div>

          {/* {allFields ? (
            <div>
              <Input name='birth_place' label='Birth Place' />
            </div>
          ) : null} */}
          <div>
            <InputMobile
              name='mobile_no'
              label='Mobile Number'
              required
              disabled={initProfile?._is_mobile_verified || initProfile?._is_profile_from_sso}
            />
          </div>
          {/* {allFields ? (
            <>
              <div>
                <InputSelect
                  name='citizenship'
                  label='Country of Citizenship'
                  options={COUNTRY_OPTIONS}
                />
              </div>
              <div>
                <InputSelect
                  name='social_classification'
                  label='Social Classification'
                  options={SOCIAL_CLASSIFICATION_OPTIONS}
                  placeholder='n/a'
                />
              </div>
              <div>
                <InputTags name='interests' label='Sector of Interest' options={[]} />
              </div>
            </>
          ) : null} */}
        </div>
        <div className='flex items-center justify-end mt-auto'>
          {note ? (
            <div className='flex-1 text-sm text-muted hidden lg:flex'>{note}</div>
          ) : (
            <div className='flex-1 hidden lg:flex' />
          )}
          {/* {initProfile?._is_profile_completed ? (
            <Button
              variant='link'
              onClick={() => {
                onBack();
              }}
            >
              {backLabel}
            </Button>
          ) : ( */}
          <Button
            variant='link'
            onClick={() => {
              confirmAlert('Are you sure you want to cancel?', {
                onConfirm: () => {
                  sessionStorage.clear();
                  router.replace('/logout');
                },
              });
            }}
          >
            {backLabel}
          </Button>
          {/* )} */}
          <Button
            variant='primary'
            trailing={<HiArrowRight />}
            type='submit'
            disabled={mutator.isLoading}
          >
            {submitLabel}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default ProfileForm;
