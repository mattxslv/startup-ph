import React, { useState, useEffect } from 'react';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import InputTextArea from '@/ui/form/InputTextArea';
import InputDatasetTags from '@/feature/dataset/InputDatasetTags';
import InputDatasetSelect from '@/feature/dataset/InputDatasetSelect';
import InputYear from '@/ui/form/InputYear';
import InputMask from '@/ui/form/InputMask';
import InputMobile from '@/ui/form/InputMobile';
import InputAddressPSGC from '@/ui/form/InputAddressPSGC';
import InputRadio from '@/ui/form/InputRadio';
import InputFileV2 from '@/ui/form/InputFileV2';
import { showModal } from '@/components/modal';
import { HiCheckCircle, HiExclamationCircle, HiChevronRight, HiChevronDown, HiUpload, HiPlus, HiX } from 'react-icons/hi';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import useProfile from '@/hooks/useProfile';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';
import { TStartup, TFunding } from '@/feature/startup/types';
import Toast from '@/ui/toast/Toast';
import { useRouter } from 'next/router';
import { useFormContext } from '@/ui/form/hooks';
import { isEmpty } from 'lodash';
import Select from '@/ui/select/Select';
import MultipleFileUploader from '@/ui/file-uploader/MultipleFileUploader';
import Accordion, { AccordionGroup } from '@/ui/accordion/Accordion';
import { AGENCY_OPTIONS, YES_NO } from '@/feature/home/constants';
import { showVerifyModal } from '@/feature/home/components/verify';

interface RequiredField {
  section: string;
  field: string;
  isCompleted: boolean;
  description?: string;
}

export const showRequiredFieldsModal = () => {
  showModal({
    id: 'required-fields-modal',
    title: 'Complete Your Profile',
    size: 'xl',
    component: RequiredFieldsModal,
    titleClose: true,
  });
};

interface Props {
  onClose: () => void;
}

interface MissingField {
  section: 'startup' | 'profile' | 'funding';
  fieldKey: string;
  fieldName: string;
  isRequired: boolean;
}

const checkMissingStartupFields = (startup: TStartup | null): MissingField[] => {
  const missing: MissingField[] = [];
  
  if (!startup) {
    missing.push(
      { section: 'startup', fieldKey: 'name', fieldName: 'Startup Name', isRequired: true },
      { section: 'startup', fieldKey: 'founder_name', fieldName: 'Founder Name', isRequired: true },
      { section: 'startup', fieldKey: 'sectors', fieldName: 'Business Sector', isRequired: true },
      { section: 'startup', fieldKey: 'business_classification', fieldName: 'Business Classification', isRequired: true },
      { section: 'startup', fieldKey: 'development_phase', fieldName: 'Development Phase', isRequired: true },
      { section: 'startup', fieldKey: 'description', fieldName: 'Description', isRequired: true },
      { section: 'startup', fieldKey: 'address', fieldName: 'Business Address', isRequired: true },
      { section: 'startup', fieldKey: 'business_name', fieldName: 'Registered Business Name', isRequired: true },
      { section: 'startup', fieldKey: 'tin', fieldName: 'TIN Number', isRequired: true },
      { section: 'startup', fieldKey: 'founding_year', fieldName: 'Founding Year', isRequired: true },
      { section: 'funding', fieldKey: 'has_funding', fieldName: 'Funding Information', isRequired: true }
    );
    return missing;
  }

  // Check startup fields
  if (!startup.name?.trim()) missing.push({ section: 'startup', fieldKey: 'name', fieldName: 'Startup Name', isRequired: true });
  if (!startup.founder_name?.trim()) missing.push({ section: 'startup', fieldKey: 'founder_name', fieldName: 'Founder Name', isRequired: true });
  if (!startup.sectors?.length) missing.push({ section: 'startup', fieldKey: 'sectors', fieldName: 'Business Sector', isRequired: true });
  if (!startup.business_classification?.trim()) missing.push({ section: 'startup', fieldKey: 'business_classification', fieldName: 'Business Classification', isRequired: true });
  if (!startup.development_phase?.trim()) missing.push({ section: 'startup', fieldKey: 'development_phase', fieldName: 'Development Phase', isRequired: true });
  if (!startup.description?.trim()) missing.push({ section: 'startup', fieldKey: 'description', fieldName: 'Description', isRequired: true });
  if (!startup.business_name?.trim()) missing.push({ section: 'startup', fieldKey: 'business_name', fieldName: 'Registered Business Name', isRequired: true });
  if (!startup.tin?.trim()) missing.push({ section: 'startup', fieldKey: 'tin', fieldName: 'TIN Number', isRequired: true });
  if (!startup.founding_year?.trim()) missing.push({ section: 'startup', fieldKey: 'founding_year', fieldName: 'Founding Year', isRequired: true });
  
  // Check address fields
  if (!startup.region_code?.trim() || !startup.province_code?.trim() || !startup.municipality_code?.trim()) {
    missing.push({ section: 'startup', fieldKey: 'address', fieldName: 'Business Address', isRequired: true });
  }
  
  // Check funding information
  if (startup.has_funding === null) {
    missing.push({ section: 'funding', fieldKey: 'has_funding', fieldName: 'Funding Information', isRequired: true });
  }

  return missing;
};

function RequiredFieldsModal({ onClose }: Props): JSX.Element {
  const { data: startup, refetch: refetchStartup } = useMyStartup();
  const { data: profile } = useProfile();
  const saveMutator = useSaveStartup();
  
  // Calculate missing fields dynamically (will update when startup data changes)
  const missingFields = checkMissingStartupFields(startup || null);
  const startupFields = missingFields.filter(field => field.section === 'startup');
  const fundingFields = missingFields.filter(field => field.section === 'funding');
  
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    startup: startupFields.length > 0,
    funding: fundingFields.length > 0
  });

  // Update expanded sections when data changes
  useEffect(() => {
    setExpandedSections(prev => ({
      ...prev,
      startup: startupFields.length > 0,
      funding: fundingFields.length > 0
    }));
  }, [startupFields.length, fundingFields.length]);
  
  // Calculate progress correctly
  const totalRequiredFields = 11; // Fixed total number of required fields
  const currentMissingFields = missingFields.length;
  const completedFields = totalRequiredFields - currentMissingFields;
  const progressPercentage = totalRequiredFields > 0 ? Math.round((completedFields / totalRequiredFields) * 100) : 100;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSaveField = async (fieldData: Partial<TStartup>) => {
    try {
      const updatedData = { ...startup, ...fieldData };
      await saveMutator.mutateAsync({ payload: updatedData });
      Toast.success('Field updated successfully!');
      // Refetch startup data to update the modal immediately
      setTimeout(() => {
        refetchStartup();
      }, 500);
    } catch (error) {
      Toast.error('Failed to update field');
    }
  };

  const getInitialValues = (): Partial<TStartup> => ({
    name: startup?.name || '',
    founder_name: startup?.founder_name || '',
    sectors: startup?.sectors || [],
    business_classification: startup?.business_classification || '',
    development_phase: startup?.development_phase || '',
    description: startup?.description || '',
    business_name: startup?.business_name || '',
    tin: startup?.tin || '',
    founding_year: startup?.founding_year || '',
    region_code: startup?.region_code || '',
    province_code: startup?.province_code || '',
    municipality_code: startup?.municipality_code || '',
    barangay_code: startup?.barangay_code || '',
    street: startup?.street || '',
    business_mobile_no: startup?.business_mobile_no || '',
    has_funding: startup?.has_funding ?? null,
    fundings: startup?.fundings || []
  });

  const renderStartupFields = () => {
    const hasIncompleteFields = startupFields.length > 0;
    
    return (
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('startup')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            {hasIncompleteFields ? (
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                {startupFields.length}
              </div>
            ) : (
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <HiCheckCircle className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-900">Startup Information</h3>
              <p className="text-sm text-gray-500">
                {hasIncompleteFields 
                  ? `${startupFields.length} fields need completion` 
                  : 'All fields completed'
                }
              </p>
            </div>
          </div>
          {expandedSections.startup ? <HiChevronDown className="w-5 h-5" /> : <HiChevronRight className="w-5 h-5" />}
        </button>
        
        {expandedSections.startup && (
          <div className="border-t p-4">
            {hasIncompleteFields ? (
              <Form initialValues={getInitialValues()} onSubmit={handleSaveField}>
                <div className="space-y-4">
                  {startupFields.map((field) => (
                    <div key={field.fieldKey} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <HiExclamationCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">{field.fieldName}</span>
                      </div>
                      {renderFieldInput(field)}
                    </div>
                  ))}
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={saveMutator.isLoading}
                    className="w-full"
                  >
                    {saveMutator.isLoading ? 'Saving...' : 'Save Startup Information'}
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="text-center py-6">
                <HiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600">All startup information has been completed!</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderFundingFields = () => {
    const hasIncompleteFields = fundingFields.length > 0;
    
    return (
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('funding')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            {hasIncompleteFields ? (
              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                {fundingFields.length}
              </div>
            ) : (
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <HiCheckCircle className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-900">Funding Information</h3>
              <p className="text-sm text-gray-500">
                {hasIncompleteFields 
                  ? `${fundingFields.length} fields need completion` 
                  : 'All fields completed'
                }
              </p>
            </div>
          </div>
          {expandedSections.funding ? <HiChevronDown className="w-5 h-5" /> : <HiChevronRight className="w-5 h-5" />}
        </button>
        
        {expandedSections.funding && (
          <div className="border-t p-4">
            {hasIncompleteFields ? (
              <Form initialValues={getInitialValues()} onSubmit={handleSaveField}>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <HiExclamationCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Funding Status</span>
                    </div>
                    <FundingFormSection />
                  </div>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={saveMutator.isLoading}
                    className="w-full"
                  >
                    {saveMutator.isLoading ? 'Saving...' : 'Save Funding Information'}
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="text-center py-6">
                <HiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Funding information has been completed!</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const FundingFormSection = () => {
    const { values, setFieldValue, errors } = useFormContext();
    const fundingList = values['fundings'] || [];
    const hasFunding = values['has_funding'];
    const fundingErrors = errors?.['fundings'] as any;
    const maxFiles = 5;

    const handleAddFunding = () => {
      const newFunding: TFunding = {
        agency: '',
        document_urls: [],
      };
      const updatedFundings = [...fundingList, newFunding];
      setFieldValue('fundings', updatedFundings);
    };

    const handleRemoveFunding = (index: number) => {
      const newFundingList = fundingList.filter((_: TFunding, i: number) => i !== index);
      setFieldValue('fundings', newFundingList);
    };

    const handleFundingChange = (e: any, index: number) => {
      const { name, value } = e.target;
      const updatedFundings = fundingList.map((funding: TFunding, idx: number) =>
        idx === index ? { ...funding, [name]: value } : funding
      );
      setFieldValue('fundings', updatedFundings);
    };

    const handleFilesChange = (urls: string[], index: number) => {
      const currentUrls = fundingList[index]?.document_urls || [];
      const updatedUrls = [...currentUrls, ...urls];
      setFieldValue(`fundings.${index}.document_urls`, updatedUrls);
    };

    const handleFileRemove = (fundingIndex: number, urlIndex: number) => {
      const currentUrls = fundingList[fundingIndex]?.document_urls || [];
      const updatedUrls = currentUrls.filter((_: string, i: number) => i !== urlIndex);
      setFieldValue(`fundings.${fundingIndex}.document_urls`, updatedUrls);
    };

    return (
      <>
        <InputRadio
          name="has_funding"
          label="Does your startup have funding?"
          options={YES_NO}
          required
        />

        {hasFunding === 1 && (
          <div className="mt-4 space-y-4">
            {!isEmpty(fundingList) && (
              <AccordionGroup allowMultiple={false}>
                {fundingList.map((funding: TFunding, index: number) => (
                  <Accordion
                    title={`Fund Granted Information ${index + 1}`}
                    id={`fund-${index + 1}`}
                    key={`${funding.agency}-${index}`}
                    index={index}
                    error={
                      fundingErrors?.[index]?.['agency'] || fundingErrors?.[index]?.['document_urls']
                    }
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-1">
                        <label className="text-muted font-medium">Agency</label>
                        <Select
                          name="agency"
                          label="Agency"
                          options={AGENCY_OPTIONS}
                          required
                          onChange={(e: any) => handleFundingChange(e, index)}
                          value={funding.agency}
                          error={fundingErrors?.[index]?.['agency']}
                        />
                        <div className="text-xs -translate-y-1 mt-2 text-muted">
                          Select the agency that provided the fund
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-muted font-medium">Proof of Funding</label>
                        <MultipleFileUploader
                          accept={[
                            'application/pdf',
                            'image/png',
                            'image/jpg',
                            'image/jpeg',
                            'application/msword',
                            'application/ms-doc',
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                          ]}
                          maxSize={50 * 1024 * 1024} // 50MB
                          maxFiles={maxFiles}
                          onUploadComplete={(e) => handleFilesChange(e, index)}
                          value={funding.document_urls}
                          error={fundingErrors?.[index]?.['document_urls']}
                          onFileRemove={(urlIndex) => handleFileRemove(index, urlIndex)}
                          endpoint="/api/v2/upload"
                        />
                      </div>
                    </div>

                    <Button
                      variant="link"
                      size="sm"
                      className="ml-auto text-danger mt-5"
                      onClick={() => handleRemoveFunding(index)}
                    >
                      <div className="inline-flex gap-1 items-center">
                        <HiX /> Delete
                      </div>
                    </Button>
                  </Accordion>
                ))}
              </AccordionGroup>
            )}

            <Button variant="primary" size="sm" className="mr-auto" onClick={handleAddFunding}>
              <div className="inline-flex gap-1 items-center">
                <HiPlus /> Add Funding Record
              </div>
            </Button>

            {fundingErrors && typeof fundingErrors === 'string' && (
              <div className="text-xs text-danger mt-2">{fundingErrors}</div>
            )}
          </div>
        )}
      </>
    );
  };

  const renderFieldInput = (field: MissingField) => {
    switch (field.fieldKey) {
      case 'name':
        return <Input name="name" label="Startup Name" required placeholder="Enter your startup name" />;
      case 'founder_name':
        return <Input name="founder_name" label="Founder Name" required placeholder="Enter founder's name" />;
      case 'sectors':
        return <InputDatasetTags code="sector" name="sectors" label="Business Sector" required />;
      case 'business_classification':
        return <InputDatasetSelect code="business_classification" name="business_classification" label="Business Classification" required />;
      case 'development_phase':
        return <InputDatasetSelect code="development_phase" name="development_phase" label="Development Phase" required />;
      case 'description':
        return <InputTextArea name="description" label="Startup Description" required placeholder="Describe what your startup does" />;
      case 'business_name':
        return <Input name="business_name" label="Registered Business Name" required placeholder="Official registered business name" />;
      case 'tin':
        return <InputMask name="tin" label="TIN Number" required mask="999-999-999-999" placeholder="000-000-000-000" />;
      case 'founding_year':
        return <InputYear name="founding_year" label="Founding Year" required />;
      case 'address':
        return (
          <div className="space-y-3">
            <InputAddressPSGC />
            <Input name="street" label="Street Address" placeholder="Building name, street name" />
          </div>
        );
      default:
        return null;
    }
  };

  if (currentMissingFields === 0) {
    return (
      <div className="text-center py-8">
        <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Complete!</h3>
        <p className="text-gray-600 mb-2">
          All required information has been filled. You're ready for verification!
        </p>
        {startup?.status === 'UNVERIFIED' && (
          <p className="text-sm text-blue-600 mb-6">
            Click "Submit for Verification" to complete additional verification requirements and submit your application for review.
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {startup?.status === 'UNVERIFIED' && (
            <Button 
              variant="primary" 
              onClick={() => {
                onClose();
                showVerifyModal();
              }}
            >
              Submit for Verification
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Completion Progress</span>
          <span className="text-sm text-gray-600">{currentMissingFields} fields remaining</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Complete these fields to become eligible for verification</p>
      </div>

      {/* Description */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Fill in the missing information below to complete your startup profile and become eligible for verification and program opportunities.
        </p>
      </div>

      {/* Profile Sections - Always show both sections */}
      <div className="space-y-4">
        {renderStartupFields()}
        {renderFundingFields()}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p>Save individual sections as you complete them.</p>
          {currentMissingFields <= 3 && (
            <p className="text-blue-600 font-medium">Almost done! Complete all fields to submit for verification.</p>
          )}
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default RequiredFieldsModal;