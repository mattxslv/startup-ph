import { useRequirementOptions } from 'features/cms-requirements';
import { useState } from 'react';
import { Button, Card, Title } from 'ui/components';
import { InlineToggle } from 'ui/forms';
import { useSyncProgramRequirements } from '../hooks/useSyncProgramRequirements';
import { IProgram, TRequirement } from '../types';
import { useUpdateProgram } from '../hooks/useProgramMutate';
import { isEqual } from 'lodash';
import SearchFilter from './SearchFilter';

type Props = {
  program: IProgram;
};

function ProgramRequirements({ program }: Props) {
  const [data, setData] = useState<Record<string, TRequirement>>(
    program?.requirements || {}
  );
  const isDirty = !isEqual(data, program?.requirements);
  const [filter, setFilter] = useState({ per_page: 1000, q: '' });
  const [isLoading, options, flat] = useRequirementOptions(filter);
  const handleToggle = (
    code: string,
    key: 'enabled' | 'required',
    newValue: boolean
  ) => {
    setData((prev) => ({
      ...prev,
      [code]: { ...prev[code], [key]: newValue },
    }));
  };
  const mutator = useUpdateProgram();
  const { isLoading: isSaving, mutate } = useSyncProgramRequirements();
  const handleSave = () => {
    const payload = {
      requirements: Object.keys(data)
        .filter((key) => data[key].enabled)
        .map((key) => ({
          requirement_id: key,
          is_required: data?.[key]?.required ? 1 : 0,
        })),
    };
    mutate({ id: program.id, payload });
  };
  return (
    <>
      <Card className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            className="form-check h-4 w-4 cursor-pointer"
            type="checkbox"
            onChange={(e) => {
              mutator.mutate({
                id: program.id,
                payload: {
                  ...program,
                  is_verified_required: e.target.checked ? '1' : '0',
                },
              });
            }}
            checked={program.is_verified_required === '1'}
          />
          <div className="text-sm">Applicants should be Verified</div>
        </label>
      </Card>
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Title>Program Requirements</Title>
            <Button
              className="px-4"
              size="xs"
              variant="primary"
              onClick={handleSave}
              disabled={isSaving || !isDirty}
            >
              Save Changes
            </Button>
          </div>

          <SearchFilter onChange={setFilter} />

          <table className="table-auto w-full text-sm">
            <thead>
              <tr>
                <th className="border bg-slate-50" style={{ width: '80px' }}>
                  Enabled
                </th>
                <th className="border bg-slate-50">Requirement</th>
                <th className="border bg-slate-50" style={{ width: '100px' }}>
                  Required
                </th>
              </tr>
            </thead>
            <tbody>
              {options.length < 1 ? (
                <tr>
                  <td className="border text-center" colSpan={3}>
                    {isLoading ? 'Loading...' : 'No requirements'}
                  </td>
                </tr>
              ) : (
                options.map((item) => {
                  const row = flat[item.value];
                  const value = data[item.value];
                  const isEnabled = Boolean(value?.enabled);
                  const isRequired = Boolean(value?.required);
                  return (
                    <tr key={item.value}>
                      <td className="border">
                        <div className="flex justify-center py-1">
                          <InlineToggle
                            label={row.label}
                            onChange={(v) => {
                              handleToggle(item.value, 'enabled', v);
                            }}
                            value={isEnabled}
                          />
                        </div>
                      </td>
                      <td className="border px-2">{row.label}</td>
                      <td className="border">
                        {isEnabled ? (
                          <div className="flex justify-center">
                            <input
                              className="form-check h-4 w-4 cursor-pointer"
                              type="checkbox"
                              onChange={(e) => {
                                handleToggle(
                                  item.value,
                                  'required',
                                  e.target.checked
                                );
                              }}
                              checked={isRequired}
                            />
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

export default ProgramRequirements;
