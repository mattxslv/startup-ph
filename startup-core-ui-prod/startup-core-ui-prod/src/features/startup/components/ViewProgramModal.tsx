import { showModal } from 'context/modal';
import { Badge, Button } from 'ui/components';
import { TStartupApplications } from '../startup';
import placeholderImage from 'assets/images/no-image.jpg';

export const showProgramModal = (data: TStartupApplications) => {
  showModal({
    id: 'program',
    title: 'Program Participated Information',
    titleClose: true,
    component: ViewProgramModal,
    props: { data },
  });
};

interface Props {
  data: TStartupApplications;
  onClose: () => void;
}

function ViewProgramModal({ data, onClose }: Props) {
  return (
    <div className="space-y-5">
      <table className="w-full">
        <tbody>
          <tr>
            <td>
              <small className="text-gray-400">Program Name</small>
            </td>
            <td>
              <small>{data.program_name}</small>
            </td>
          </tr>
          <tr>
            <td>
              <small className="text-gray-400">Agency</small>
            </td>
            <td>
              <small>{data.agency}</small>
            </td>
          </tr>
          <tr>
            <td>
              <small className="text-gray-400">Short Description</small>
            </td>
            <td>
              <small>{data.description}</small>
            </td>
          </tr>
          <tr>
            <td>
              <small className="text-gray-400">Date Applied</small>
            </td>
            <td>
              <small>{new Date(data.submitted_at).toLocaleString()}</small>
            </td>
          </tr>
          <tr>
            <td>
              <small className="text-gray-400">Status</small>
            </td>
            <td>
              <Badge
                variant={data.status === 'FOR ASSESSMENT' ? 'info' : 'success'}
              >
                <small>{data.status}</small>
              </Badge>
            </td>
          </tr>
        </tbody>
      </table>

      <p className="font-semibold text-sm">Program Details</p>
      <div className="flex gap-5">
        <div className="w-[30%]">
          <img src={data.banner_url || placeholderImage} alt="Banner" />
        </div>
        <div className="w-[70%] flex flex-col gap-2">
          <p className="text-gray-400 text-sm">
            Date Published{' '}
            <span className="text-black ml-3">
              {new Date(data.date_start).toDateString()}
            </span>
          </p>
          <p className="text-gray-400 text-sm">
            Program Period{' '}
            <span className="text-black ml-3">
              {new Date(data.date_end).toDateString()}
            </span>
          </p>
          <div
            className="mt-5"
            dangerouslySetInnerHTML={{ __html: data.program_content_body }}
          ></div>
        </div>
      </div>

      <Button className="w-full" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}

export default ViewProgramModal;
