import { logo } from 'assets/images';

type Props = {};

function Splash({}: Props) {
  return (
    <div className="w-screen h-screen z-50 flex">
      <div className="m-auto animate-pulse">
        <img
          className="h-10 object-left object-contain"
          src={logo}
          alt="brand"
        />
      </div>
    </div>
  );
}

export default Splash;
