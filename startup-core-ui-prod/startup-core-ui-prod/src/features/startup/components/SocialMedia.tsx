import { TStartUp } from '../startup';
import website from 'assets/images/icons/website.png';
import instagram from 'assets/images/icons/instagram.png';
import facebook from 'assets/images/icons/facebook.png';
import linkedin from 'assets/images/icons/linkedin.png';

const SocialMedia = ({ data }: { data: TStartUp }) => {
  return (
    <div className="flex flex-col gap-2 items-center grayscale">
      <h1 className="font-semibold">Follow us on</h1>
      <div className="flex items-center gap-4">
        {data.social_website_url ? (
          <a href={data.social_website_url} target="_blank" rel="noreferrer">
            <img src={website} alt="website" width={25} height={25} />
          </a>
        ) : null}
        {data.social_instagram_url ? (
          <a href={data.social_instagram_url} target="_blank" rel="noreferrer">
            <img src={instagram} alt="instagram" width={20} height={20} />
          </a>
        ) : null}
        {data.social_facebook_url ? (
          <a href={data.social_facebook_url} target="_blank" rel="noreferrer">
            <img src={facebook} alt="facebook" width={25} height={25} />
          </a>
        ) : null}
        {data.social_linkedin_url ? (
          <a href={data.social_linkedin_url} target="_blank" rel="noreferrer">
            <img src={linkedin} alt="linkedIn" width={25} height={25} />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default SocialMedia;
