import { BrowserRouter } from 'react-router-dom';
import Providers from 'layouts/Providers';
import ReactDOM from 'react-dom/client';
import 'assets/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'lib/react-datepicker/custom-style.css';
import dayjs from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import App from './App';
import ModalContainer from 'egov-upload-widget/modal-container';

dayjs.extend(dayjsDuration);
dayjs.extend(dayjsRelativeTime);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Providers>
      <>
        <App />
        <ModalContainer />
      </>
    </Providers>
  </BrowserRouter>
);
