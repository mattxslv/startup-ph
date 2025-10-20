import { Navigate, Route, Routes } from 'react-router-dom';
import AdminRoutes from 'pages/admin';
import Login from 'pages/login';
import { useSession } from 'context/session';

const PrivateMapper = (): JSX.Element => {
  const [isAuthenticated] = useSession((state) => state.isAuthenticated);
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  return <AdminRoutes />;
};

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PrivateMapper />} />
    </Routes>
  );
};

export default App;
