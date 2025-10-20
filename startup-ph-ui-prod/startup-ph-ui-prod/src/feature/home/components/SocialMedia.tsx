import { TStartup } from '@/feature/startup/types';

const SocialMedia = ({ data }: { data: TStartup }) => {
  return (
    <div className='flex flex-col gap-2 items-center grayscale'>
      <h1 className='font-semibold'>Follow us on</h1>
      <div className='flex items-center gap-4'>
        {data.social_website_url ? (
          <a href={data.social_website_url} target='_blank'>
            <img src='/images/icons/website.png' alt='website' width={25} height={25} />
          </a>
        ) : null}
        {data.social_instagram_url ? (
          <a href={data.social_instagram_url} target='_blank'>
            <img src='/images/icons/instagram.png' alt='instagram' width={20} height={20} />
          </a>
        ) : null}
        {data.social_facebook_url ? (
          <a href={data.social_facebook_url} target='_blank'>
            <img src='/images/icons/facebook.png' alt='facebook' width={25} height={25} />
          </a>
        ) : null}
        {data.social_linkedin_url ? (
          <a href={data.social_linkedin_url} target='_blank'>
            <img src='/images/icons/linkedin.png' alt='linkedIn' width={25} height={25} />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default SocialMedia;
