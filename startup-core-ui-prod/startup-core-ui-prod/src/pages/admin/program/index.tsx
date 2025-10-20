import { Routes, Route, Navigate } from 'react-router-dom';
import { NavHeaderTitle } from 'components';
import { Title } from 'ui/components';
import Page404 from 'pages/404';
import ProgramListPage from './ProgramListPage';
import { Acl } from 'features/profile';

type Props = {};

function ProgramRoutes({}: Props) {
  return (
    <>
      <NavHeaderTitle>
        <Title>Programs</Title>
      </NavHeaderTitle>
      <Routes>
        <Route index element={<Navigate to="list" />} />
        <Route
          path="list"
          element={
            <Acl code={['programs-view']}>
              <ProgramListPage />
            </Acl>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default ProgramRoutes;
