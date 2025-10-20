function get<VType>(key: string, defaultValue: VType) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const l1 = JSON.parse(localStorage.getItem(key) ?? '')
    return typeof l1 === 'string' ? JSON.parse(l1) : l1 || defaultValue
  } catch (err) {
    return defaultValue
  }
}

function set<VType>(key: string, newValue: VType) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(newValue))
}

function remove(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key)
}

// eslint-disable-next-line
export default {
  get,
  set,
  remove
}
