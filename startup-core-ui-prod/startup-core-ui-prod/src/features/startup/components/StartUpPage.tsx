import { Badge, Img } from 'ui/components';
import { HiCheckCircle } from 'react-icons/hi';
import ViewCampaign from 'ui/components/input-campaign/ViewCampaign';
import { TStartUp } from '../startup';
import StartupInfo from './StartupInfo';

type Props = {
  data: TStartUp;
};

function StartupStatusBadge({ data }: Props) {
  const normalizedStatus = data.status?.toUpperCase();
  
  if (normalizedStatus === 'UNVERIFIED')
    return <Badge className="-translate-y-0.5 ml-2">Unverified</Badge>;
  if (normalizedStatus === 'FOR VERIFICATION')
    return (
      <Badge className="-translate-y-0.5 ml-2" variant="warning">
        In Review
      </Badge>
    );
  if (normalizedStatus === 'FOR RESUBMISSION')
    return (
      <Badge className="-translate-y-0.5 ml-2" variant="danger">
        For Resubmit
      </Badge>
    );
  if (normalizedStatus === 'VERIFIED')
    return (
      <div className="inline-flex text-success-base ml-2">
        <HiCheckCircle className="translate-y-0.5" />
        <div className="text-sm font-semibold">Verified</div>
      </div>
    );
  return null;
}

function StartUpPage({ data }: Props) {
  return (
    <div className="w-full mx-auto">
      <div className="relative z-10">
        <div className="relative pt-[38.31%] bg-gray-400">
          <div className="absolute inset-0 h-full w-full flex">
            {data.banner_url ? (
              <Img
                className="inset-0 absolute h-full w-full"
                imgClassName="object-center object-cover"
                src={data.banner_url}
                alt=""
              />
            ) : (
              <span className="m-auto text-xl text-center font-light tracking-tighter text-white">
                No banner
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="relative bg-white rounded-lg py-3 px-4 mx-4 -translate-y-12 space-y-4 z-20">
        <div className="flex">
          <div className="flex-shrink-0 mr-4">
            <Img
              className="h-20 w-20 lg:h-14 lg:w-14 rounded-lg bg-gray-400 object-center object-contain"
              src={data.logo_url}
              alt={data.name}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-base font-bold text-dark">
              {data.name}
              <StartupStatusBadge data={data} />
            </div>
            <div className="text-xs font-semibold text-description">
              {data.founder_name}
            </div>
            {/* <div className='text-xs font-medium text-description'>{data.address_label}</div> */}
            <div className="text-sm text-description">{data.description}</div>
          </div>
        </div>
        {/* <div className='space-y-2'>
          <Info label='Startup Sector'>
            <BadgeArray list={data.sectors} />
          </Info>
          <Info label='Business Classification'>{data.business_classification || '-'}</Info>
          <Info label='Founding Year'>{data.founding_year || '-'}</Info>
          <Info label='Contact Number'>{'-'}</Info>
        </div> */}
        <StartupInfo
          data={data}
          isUnverified={false}
          isVerifiable={undefined}
          canEdit={false}
        />
        <hr />
        <div>
          {Array.isArray(data?.body) ? (
            <ViewCampaign data={data?.body} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default StartUpPage;
