import { Routes, Route, Navigate } from 'react-router-dom';
import { NavHeaderTitle } from 'components';
import { Title } from 'ui/components';
import Page404 from 'pages/404';

import DatasetRoutes from './dataset';
import RequirementPage from './RequirementPage';
import NewsPage from './NewsPage';
import AssessmentTagsPage from './AssessmentTagsPage';
import { Acl, useAcl } from 'features/profile';
import ResourcesPage from './ResourcesPage';

type Props = {};

const ACL_MAP = {
  'news-view': 'news',
  'resources-view': 'resources',
  'requirements-view': 'requirements',
  'datasets-view': 'dataset',
  'assessment-tags-view': 'assessment-tags',
};

function CmsRoutes({}: Props) {
  const { mapAcl } = useAcl();
  return (
    <>
      <NavHeaderTitle>
        <Title>Content Management</Title>
      </NavHeaderTitle>
      <Routes>
        <Route index element={<Navigate to={mapAcl(ACL_MAP)} />} />
        <Route
          path="news"
          element={
            <Acl code={['news-view']}>
              <NewsPage />
            </Acl>
          }
        />
        <Route
          path="resources"
          element={
            <Acl code={['resources-view']}>
              <ResourcesPage />
            </Acl>
          }
        />
        <Route
          path="requirements"
          element={
            <Acl code={['requirements-view']}>
              <RequirementPage />
            </Acl>
          }
        />
        <Route
          path="dataset"
          element={
            <Acl code={['datasets-view']}>
              <DatasetRoutes />
            </Acl>
          }
        />
        <Route
          path="assessment-tags"
          element={
            <Acl code={['assessment-tags-view']}>
              <AssessmentTagsPage />
            </Acl>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default CmsRoutes;
