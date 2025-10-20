// DEPRECIATED: CLEAN THIS LATER

import { ISelectOption } from 'ui/forms/types';

export const PERMISSIONS: Record<string, string[]> = {
  Dashboard: ['dashboard'],
  Webinar: ['webinar-schedule', 'webinar-management', 'webinar-attendance'],
  Exam: [
    'exam-schedule',
    'exam-management',
    'exam-result',
    'exam-list-of-examinees',
  ],
  Reports: ['reports'],
  Registrants: ['registrants'],
  CMS: [
    'cms-subjects',
    'cms-confidentiality-clause',
    'cms-exam-guidelines',
    'cms-employers',
    'cms-venue',
    'cms-notifications',
  ],
  Logs: ['logs'],
  'Access Control': ['access-control', 'roles-permissions', 'cms-integrations'],
};

export const permissionOptions = ((): ISelectOption[] => {
  let list: string[] = [];
  Object.keys(PERMISSIONS).forEach((key) => {
    list = list.concat(PERMISSIONS[key]);
  });
  return list.map((item) => ({
    label: item,
    value: item,
  }));
})();
