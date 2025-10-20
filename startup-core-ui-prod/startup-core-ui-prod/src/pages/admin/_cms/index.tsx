import { Routes, Route, Navigate } from 'react-router-dom';
import Page404 from 'pages/404';
import CmsRequirementsPage from './CmsRequirementsPage';
// import QueryAddRecordPage from './QueryAddRecordPage';
import { NavHeaderTitle } from 'components';
import { Title } from 'ui/components';

type Props = {};

function CmsRoutes({}: Props) {
  return (
    <>
      <NavHeaderTitle>
        <Title>Content Management</Title>
      </NavHeaderTitle>
      <Routes>
        <Route index element={<Navigate to="requirements" />} />
        <Route path="requirements" element={<CmsRequirementsPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default CmsRoutes;
