import { useCallback } from 'react';
import { useProfile } from '../context';

function compareArrays(arr1: string[], arr2: string[]) {
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) {
      return true;
    }
  }
  return false;
}

function useAcl() {
  const { profile } = useProfile();
  const acl = useCallback(
    (key: string | string[]): boolean => {
      if (!profile) return false;
      if (typeof key === 'string') return profile.permissions.includes(key);
      return compareArrays(profile.permissions, key);
    },
    [profile]
  );
  const mapAcl = useCallback(
    (map: Record<string, string>) => {
      if (!profile) return '';
      const keys = Object.keys(map);
      for (const x of keys) {
        if (profile.permissions.includes(x)) {
          return map[x];
        }
      }
      return '';
    },
    [profile]
  );
  return { acl, mapAcl };
}

export default useAcl;
