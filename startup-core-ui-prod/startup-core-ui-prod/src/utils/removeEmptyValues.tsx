function removeEmptyValues(obj: any): object {
  const cleanedObj: Record<string, any> = {};
  for (const prop in obj) {
    if (obj[prop] !== null && obj[prop] !== undefined && obj[prop] !== '') {
      cleanedObj[prop] = obj[prop];
    }
  }
  return cleanedObj;
}

export default removeEmptyValues;
