import { lazy } from 'react';
import AdminShell from 'layouts/AdminShell';
import PageNotFound from 'pages/404';
import Logout from 'pages/logout';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from 'pages/profile';
import LogsPage from './LogsPage';
import { Acl } from 'features/profile';

const Dashboard = lazy(() => import('./dashboard'));
const StartUpRoutes = lazy(() => import('./startup'));
const ProgramRoutes = lazy(() => import('./program'));
const CmsRoutes = lazy(() => import('./cms'));
const AccessControlRoutes = lazy(() => import('./access-control'));

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="*" element={<AdminShell />}>
          <Route index path="home" element={<Dashboard />} />
          <Route
            path="startup/*"
            element={
              <Acl code={['startups-view']}>
                <StartUpRoutes />
              </Acl>
            }
          />
          <Route
            path="program/*"
            element={
              <Acl code={['programs-view']}>
                <ProgramRoutes />
              </Acl>
            }
          />
          <Route path="cms/*" element={<CmsRoutes />} />
          <Route path="access-control/*" element={<AccessControlRoutes />} />
          <Route
            path="logs"
            element={
              <Acl code={['audits-view']}>
                <LogsPage />
              </Acl>
            }
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRoutes;
