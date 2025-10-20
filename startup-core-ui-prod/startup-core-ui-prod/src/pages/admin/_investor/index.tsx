import { Routes, Route, Navigate } from 'react-router-dom';
import Page404 from 'pages/404';
// import InvestorForReview from './InvestorForReview';
import { NavHeaderTitle } from 'components';
import { Title } from 'ui/components';
import ForReviewPage from './ForReviewPage';
import RequirementReviewPage from './RequirementReviewPage';
import ApprovedPage from './ApprovedPage';
import RejectedPage from './RejectedPage';
import ForSubmissionPage from './ForSubmissionPage';
import InvestorPage from './InvestorPage';

type Props = {};

function InvestorRoutes({}: Props) {
  return (
    <>
      <NavHeaderTitle>
        <Title>Investors</Title>
      </NavHeaderTitle>
      <Routes>
        <Route index element={<Navigate to="for-review" />} />
        <Route path="for-review" element={<ForReviewPage />} />
        <Route
          path="for-requirement-submission"
          element={<ForSubmissionPage />}
        />
        <Route path="requirement-review" element={<RequirementReviewPage />} />
        <Route path="approved" element={<ApprovedPage />} />
        <Route path="rejected" element={<RejectedPage />} />
        <Route path=":investorId" element={<InvestorPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default InvestorRoutes;
