import { Navigate } from 'react-router-dom';
import { useSession } from 'context/session';
import { Login } from 'features/authentication';
import { make } from 'assets/images';

// type Props = {}

const LoginPage = (): JSX.Element => {
  const [isAuthenticated] = useSession((state) => state.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/home" />;

  return (
    <div className="h-screen relative flex flex-col w-full bg-cover bg-right bg-gradient-to-b from-[#F4FAFF] to-[#E4EAFF]">
      <div className="m-auto w-full relative z-20">
        <Login />
      </div>
      <div className="flex flex-col justify-center items-center mb-14 relative z-20">
        <div className="mb-2 text-sm text-[#AFAFAF]">Developed By</div>
        <div className="flex space-x-8">
          <img className="h-16" src={make} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
