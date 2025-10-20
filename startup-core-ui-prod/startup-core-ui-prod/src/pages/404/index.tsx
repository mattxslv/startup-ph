import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

// import { notFound } from 'assets/images'

function PageNotFound() {
  return (
    <div className="bg-gray-50 flex items-center justify-center h-[85vh]">
      <div className="w-[30rem] flex flex-col items-center gap-6">
        <figure>
          {/* <img className='w-full mb-6' src={notFound} alt="Not found" /> */}
          <figcaption className="text-center space-y-2">
            <h1 className="font-bold text-2xl">Page Not Found</h1>
            <p className="font-light">
              We&apos;re sorry, the page you requested could not be found.{' '}
              <br />
              Please go back to the homepage.
            </p>
          </figcaption>
        </figure>

        <div>
          <Link
            className="rounded px-4 py-3 bg-primary-base flex items-center gap-2 text-white"
            to="/"
          >
            <BsArrowLeft />
            <span> Go back to homepage.</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
