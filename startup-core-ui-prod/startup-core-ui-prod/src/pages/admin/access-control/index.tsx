import { Routes, Route, Navigate } from 'react-router-dom';
import Page404 from 'pages/404';
import UserManagementPage from './UserManagementPage';
import RolePermissionsPage from './RolePermissionsPage';
import OverridePage from './OverridePage';
import { NavHeaderTitle } from 'components';
import { Title } from 'ui/components';
import { Acl, useAcl } from 'features/profile';
import { lazy } from 'react';

const UserDetails = lazy(() => import('./UserManagementPage/UserDetails'));
const RoleDetails = lazy(() => import('./RolePermissionsPage/RoleDetails'));

type Props = {};

const ACL_MAP = {
  'administrators-view': 'users',
  'roles-view': 'roles',
  // 'ALL_ACCESS': 'override',
};

function AccessControlRoutes({}: Props) {
  const { mapAcl } = useAcl();
  return (
    <>
      <NavHeaderTitle>
        <Title>Access Control</Title>
      </NavHeaderTitle>
      <Routes>
        <Route index element={<Navigate to={mapAcl(ACL_MAP)} />} />
        <Route
          path="users"
          element={
            <Acl code={['administrators-view']}>
              <UserManagementPage />
            </Acl>
          }
        >
          <Route
            path=":id"
            element={
              <Acl code={['administrators-view']}>
                <UserDetails />
              </Acl>
            }
          />
        </Route>
        <Route
          path="roles"
          element={
            <Acl code={['roles-view']}>
              <RolePermissionsPage />
            </Acl>
          }
        >
          <Route
            path=":id"
            element={
              <Acl code="ALL_ACCESS">
                <RoleDetails />
              </Acl>
            }
          />
        </Route>
        <Route
          path="override"
          element={
            <Acl code="ALL_ACCESS">
              <OverridePage />
            </Acl>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default AccessControlRoutes;
