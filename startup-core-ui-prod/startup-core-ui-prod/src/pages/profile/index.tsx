import { showChangePasswordModal, useProfile } from 'features/profile';
import PageContainer from 'layouts/PageContainer';
import { Title, Button, Card, Info } from 'ui/components';

function ProfilePage() {
  const { profile } = useProfile();
  return (
    <>
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 space-y-4">
            <Title>Profile</Title>
            <div>
              <Info label="Name">{profile.name}</Info>
              <Info label="Email">{profile.email}</Info>
            </div>
          </Card>
          <Card className="space-y-4">
            <Title>Security</Title>
            <Button onClick={() => showChangePasswordModal()}>
              Change Password
            </Button>
          </Card>
        </div>
      </PageContainer>
    </>
  );
}

export default ProfilePage;
