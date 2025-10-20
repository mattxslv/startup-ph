import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Title } from 'ui/components';
import { NavHeaderTitle } from 'components';
import PageContainer from 'layouts/PageContainer';
import { HiArrowLeft } from 'react-icons/hi';
import { Investor } from 'features/investors';

function InvestorPage() {
  const navigate = useNavigate();
  const { investorId } = useParams();
  if (!investorId) return null;
  return (
    <>
      <NavHeaderTitle>
        <Button
          size="sm"
          onClick={() => navigate(-1)}
          leadingIcon={<HiArrowLeft />}
        >
          Go Back
        </Button>
        <Title>Investor</Title>
      </NavHeaderTitle>
      <PageContainer className="space-y-4" /* className="relative" */>
        {/* <div className="absolute top-0 left-0 pl-3 py-6 bg-red-200 h-full w-[200px] flex">
          <Card className="w-full px-0 flex flex-col">
            <div>LIst</div>
          </Card>
        </div>
        <div className="flex flex-col flex-1 space-y-4 pl-[200px]"> */}
        <Investor investorId={investorId} />
        {/* </div> */}
      </PageContainer>
    </>
  );
}

export default InvestorPage;
