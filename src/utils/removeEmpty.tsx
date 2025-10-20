type CleanedValue<T> = T extends Array<infer U>
  ? Array<CleanedValue<U>>
  : T extends object
  ? { [K in keyof T]?: CleanedValue<T[K]> }
  : T;

export default function removeEmptyValues<T>(obj: T): Partial<T> {
  // Handle arrays
  if (Array.isArray(obj)) {
    const filteredArray = obj
      .map((item) => removeEmptyValues(item))
      .filter((item) => !isEmpty(item));
    // Properly cast array result
    return (filteredArray.length ? filteredArray : []) as unknown as Partial<T>;
  }

  // Handle objects
  if (obj !== null && typeof obj === 'object') {
    const newObj = {} as { [K in keyof T]?: CleanedValue<T[K]> };

    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = removeEmptyValues(value);
      if (typeof value === 'number' || !isEmpty(cleanedValue)) {
        newObj[key as keyof T] = cleanedValue as CleanedValue<T[keyof T]>;
      }
    }

    return newObj as Partial<T>;
  }

  // Handle primitive values
  if (typeof obj === 'number') {
    return obj as Partial<T>;
  }

  return isEmpty(obj) ? ({} as Partial<T>) : (obj as Partial<T>);
}

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim() === '';
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'number') {
    return false;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}
