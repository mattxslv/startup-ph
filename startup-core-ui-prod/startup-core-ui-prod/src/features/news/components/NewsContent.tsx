import { useState } from 'react';
import { Button, FitContent, InputCampaign } from 'ui/components';
import { INews } from '../types';
import { Section } from 'ui/components/input-campaign/types';
import { isEqual } from 'lodash';
import clsx from 'clsx';
import { useUpdateNews } from '../hooks/useNewsMutate';

type Props = {
  data: INews;
};

const empty: Array<Section> = [];

function NewsContent({ data }: Props) {
  const [value, setValue] = useState<Array<Section>>(data?.body || empty);
  const mutator = useUpdateNews();
  const isDirty = !isEqual(value, data?.body || empty);
  const handleSave = () => {
    mutator.mutate({
      id: data.id,
      payload: {
        ...data,
        body: value,
      },
    });
  };
  return (
    <FitContent className="flex flex-col">
      {isDirty ? (
        <div className={clsx('w-full bg-danger-base text-white py-1 px-4')}>
          <div className="mx-auto w-full flex items-center">
            <div className="text-xs font-semibold mr-auto">
              You have unsaved changes
            </div>
            <Button
              className="w-[142px]"
              size="xs"
              variant="base"
              onClick={handleSave}
              disabled={mutator.isLoading}
            >
              {mutator.isLoading ? 'Loading...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      ) : null}
      <div className="px-3 mb-4">
        <div className="mt-1 text-xl tracking-wide font-semibold leading-6 text-slate-900">
          {data.title}
        </div>
        <div className="text-sm tracking-wide leading-6 text-slate-500">
          {data.publish_date} ~ {data.publish_by}
        </div>
      </div>
      <InputCampaign onChange={(x) => setValue(x)} value={value} />
    </FitContent>
  );
}

export default NewsContent;
