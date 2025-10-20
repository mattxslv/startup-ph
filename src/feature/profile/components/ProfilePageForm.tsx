import { EXTENSION_NAMES, GENDER_OPTIONS, IProfile } from '@/hooks/useProfile';
import { CITIZENSHIP_OPTIONS, SOCIAL_CLASSIFICATION_OPTIONS } from '@/lookups';
import Button from '@/ui/button/Button';
import { useFormContext } from '@/ui/form/hooks';
import Input from '@/ui/form/Input';
import InputDateV2 from '@/ui/form/InputDateV2';
import InputFileV2 from '@/ui/form/InputFileV2';
import InputMobile from '@/ui/form/InputMobile';
import InputSelect from '@/ui/form/InputSelect';
import Toast from '@/ui/toast/Toast';
import { getPreviousYear } from '@/utils/getPreviousYears';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { HiCamera } from 'react-icons/hi';

interface IProps {
  isEditing: boolean;
  profile: IProfile | undefined;
  cancelEdit: () => void;
  isLoading: boolean;
  isDirty: boolean;
}

const CustomProfileInput = (props: any) => {
  const { isEditing, onToggleMenu, MenuComponent, isShowMenu, progressPercentage, error } = props;
  const { values } = useFormContext();
  const profile_url = values['photo_url'];

  useEffect(() => {
    if (!error) return;
    Toast.error(error);
  }, [error]);
  return (
    <div className='relative'>
      <button
        type='button'
        disabled={!isEditing}
        onClick={onToggleMenu}
        className='relative rounded-full h-40 w-40 flex items-center justify-center bg-gray-400'
      >
        {progressPercentage ? (
          <div className='m-auto text-sm text-center text-white'>{progressPercentage} %</div>
        ) : profile_url ? (
          <div>
            <Image
              className='object-center object-cover inset-0 absolute h-full w-full rounded-full'
              fill
              src={profile_url}
              sizes='400px'
              alt=''
            />
          </div>
        ) : (
          <div className='m-auto text-sm text-center text-white'>Profile Photo</div>
        )}
        <div className='rounded-full absolute bottom-1 right-1 p-3 bg-gray-100'>
          <HiCamera className={!isEditing ? 'opacity-50' : ''} />
        </div>
      </button>
      <div className='absolute bottom-5 right-5 w-32'>{isShowMenu ? MenuComponent : null}</div>
    </div>
  );
};

const ProfilePageForm = ({ isEditing, profile, cancelEdit, isLoading, isDirty }: IProps) => {
  return (
    <div className='flex gap-6 flex-col md:flex-row'>
      <div className='self-center md:self-start'>
        <InputFileV2
          name='photo_url'
          disabled={!isEditing}
          placeholder={
            <div className='m-auto text-center text-gray-400 text-xs p-2'>Upload Profile Photo</div>
          }
          imageOnly
          customRender={<CustomProfileInput isEditing={isEditing} />}
        />
      </div>

      <div className='flex flex-col gap-8 grow w-full'>
        <h2 className='font-semibold text-sm'>Personal Information</h2>

        <div className='flex flex-col md:flex-row justify-items-stretch gap-6'>
          <div className='flex flex-col gap-6 flex-1 w-full'>
            {isEditing ? (
              <Input
                name='first_name'
                label='First Name'
                disabled={!isEditing}
                className='uppercase'
                required
              />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>First Name:</small>
                <p>{profile?.first_name}</p>
              </div>
            )}

            {isEditing ? (
              <Input
                name='middle_name'
                label='Middle Name'
                disabled={!isEditing}
                className='uppercase'
                required
              />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>Middle Name:</small>
                <p>{profile?.middle_name}</p>
              </div>
            )}

            {isEditing ? (
              <Input
                name='last_name'
                label='Last Name'
                disabled={!isEditing}
                className='uppercase'
                required
              />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>Extension Name:</small>
                <p>{profile?.suffix_name}</p>
              </div>
            )}

            {isEditing ? (
              <InputSelect
                name='suffix_name'
                label='Extension Name'
                disabled={!isEditing}
                options={EXTENSION_NAMES}
                required
              />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>Last Name:</small>
                <p>{profile?.last_name}</p>
              </div>
            )}

            {isEditing ? (
              <Input name='email' label='Email' disabled={!isEditing} required />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>Email:</small>
                <p>{profile?.email}</p>
              </div>
            )}

            {isEditing ? (
              <InputMobile name='mobile_no' label='Mobile Number' disabled={!isEditing} required />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>Mobile Number:</small>
                <p>{profile?.mobile_no}</p>
              </div>
            )}
          </div>

          <div className='flex flex-col gap-6 flex-1 w-full'>
            {isEditing ? (
              <InputSelect
                name='gender'
                label='Sex'
                options={GENDER_OPTIONS}
                disabled={!isEditing}
                required
              />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>Sex:</small>
                <p>{profile?.gender}</p>
              </div>
            )}

            {isEditing ? (
              <InputDateV2
                name='birth_date'
                label='Birth Date'
                disabled={!isEditing}
                required
                maxDate={getPreviousYear(15)}
              />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>Birth Date:</small>
                <p>{profile?.birth_date}</p>
              </div>
            )}

            {isEditing ? (
              <Input name='birth_place' label='Birth Place' disabled={!isEditing} required />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>Birth Place:</small>
                <p>{profile?.birth_place}</p>
              </div>
            )}

            {isEditing ? (
              <InputSelect
                name='citizenship'
                label='Citizenship'
                options={CITIZENSHIP_OPTIONS}
                disabled={!isEditing}
                required
              />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>Citizenship:</small>
                <p>{profile?.citizenship}</p>
              </div>
            )}

            {isEditing ? (
              <InputSelect
                name='social_classification'
                label='Social Classification'
                options={SOCIAL_CLASSIFICATION_OPTIONS}
                placeholder='n/a'
                disabled={!isEditing}
                required
              />
            ) : (
              <div className='flex flex-col gap-1 flex-1'>
                <small className='text-xs text-gray-500'>Social Classification:</small>
                <p>{profile?.social_classification}</p>
              </div>
            )}
          </div>
        </div>

        <h2 className='font-semibold text-sm'>Identification</h2>

        <div className='flex flex-col md:flex-row gap-6'>
          {isEditing ? (
            <Input name='identification_no' label='ID Number' disabled={!isEditing} required />
          ) : (
            <div className='flex flex-col gap-1 flex-1'>
              <small className='text-xs text-gray-500'>ID Number:</small>
              <p>{profile?.identification_no}</p>
            </div>
          )}

          <InputFileV2
            name='identification_url'
            inputLabel='Government-issued ID'
            className='w-32'
            disabled={!isEditing}
            required
            placeholder={
              <div className='m-auto text-center text-gray-400 text-xs p-2'>Upload ID</div>
            }
          />
        </div>

        <div className={clsx('flex items-center justify-end gap-3', !isEditing && 'hidden')}>
          <Button
            disabled={!isEditing || isLoading}
            variant='link'
            type='button'
            onClick={cancelEdit}
          >
            Cancel
          </Button>
          <Button
            disabled={!isEditing || isLoading || !isDirty}
            variant='primary'
            type='submit'
            className='w-40'
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageForm;
