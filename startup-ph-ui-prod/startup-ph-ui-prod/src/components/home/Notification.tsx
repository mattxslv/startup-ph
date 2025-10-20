import React from 'react'
// import useMyProject, { useHasAlteastOneProject } from '../project/useMyProject';
import { HiBell, HiInformationCircle } from 'react-icons/hi';
import Link from 'next/link';

type Props = {}

function Notification({}: Props) {
  // const { isReady, hasProject } = useHasAlteastOneProject();
  // const { data: project } = useMyProject();
  const isReady = false;
  const hasProject = false;
  const project = { status: '' };

  if (!isReady) return null;

  if (!hasProject) return (
    <div className="p-6 bg-[#FFFCF2] border border-[#FFB803] text-sm sm:rounded-lg">
      <div className="flex space-x-1 items-center text-[#FFB803] mb-2">
        <HiInformationCircle className="h-4 w-4" />
        <div className="font-bold">You have not setup your startup yet:</div>
      </div>
      <div className="text-sm text-dark">
        Get started by <Link className="underline" href="/onboarding/startup">Clicking here</Link>.
      </div>
      {/* <ul className="list-disc pl-6 space-y-2">
        {!hasLogo ? <li><a className="underline" href="#asset-card">Logo</a></li> : null}
        {!hasBanner ? <li><a className="underline" href="#asset-card">Banner</a></li> : null}
      </ul> */}
    </div>
  );

  if (project?.status === 'INCOMPLETE') {
    return (
      <div className="p-6 bg-[#FFFCF2] border border-[#FFB803] text-sm sm:rounded-lg">
        <div className="flex space-x-1 items-center text-[#FFB803] mb-2">
          <HiBell className="h-4 w-4" />
          <div className="font-bold">Complete your details:</div>
        </div>
        <div className="text-sm text-dark">
          You are almost there. <Link className="underline" href="/onboarding/startup">Click here to continue</Link> with your profile setup.
        </div>
        {/* <ul className="list-disc pl-6 space-y-2">
          {!hasLogo ? <li><a className="underline" href="#asset-card">Logo</a></li> : null}
          {!hasBanner ? <li><a className="underline" href="#asset-card">Banner</a></li> : null}
        </ul> */}
      </div>
    );
  }

  return null;
}

export default Notification