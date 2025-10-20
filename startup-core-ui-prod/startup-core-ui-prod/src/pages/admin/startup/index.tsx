import { Routes, Route, Navigate } from 'react-router-dom';
import { NavHeaderTitle } from 'components';
import { Title } from 'ui/components';
import Page404 from 'pages/404';
import StartupListPage from './StartupListPage';
import { Acl } from 'features/profile';

type Props = {};

function StartUpRoutes({}: Props) {
  return (
    <>
      <NavHeaderTitle>
        <Title>StartUp</Title>
      </NavHeaderTitle>
      <Routes>
        <Route index element={<Navigate to="list" />} />
        <Route
          path=":type"
          element={
            <Acl code={['startups-view']}>
              <StartupListPage />
            </Acl>
          }
        />
        {/* <Route
          path="for-verification"
          element={<ForVerificationListPage />}
        /> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default StartUpRoutes;
