import Card from '@/components/partial/Card';
import DevelopedBy from '@/components/partial/DevelopedBy';
import CardContent from '@/feature/profile/components/CardContent';
import withAuth from '@/hoc/withAuth';

import HomeLayout from '@/layout/HomeLayout';

type Props = {};

function ProfilePage({}: Props) {
  return (
    <HomeLayout>
      <div className='px-[1rem] md:px-[4rem] py-[1rem]'>
        <Card>
          <CardContent />
        </Card>
      </div>
      <div className='w-full'>
        <DevelopedBy />
      </div>
    </HomeLayout>
  );
}

export default withAuth(ProfilePage);
