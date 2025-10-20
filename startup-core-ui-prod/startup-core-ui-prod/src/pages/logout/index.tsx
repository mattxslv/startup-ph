import { useSession } from 'context/session';
import { queryClient } from 'lib';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const [, setSession] = useSession(() => null);
  useEffect(() => {
    navigate('/');
    setSession({ isAuthenticated: false, token: undefined });
    queryClient.clear();
    // eslint-disable-next-line
  }, [])
  return <div className="container mx-auto">Logging out...Please wait.</div>;
}

export default Logout;
