//['page','limit','sortBy','sortOrder']

const pick = <T extends Record<string, unknown>, k extends keyof T>( obj: T, objectKey: k[]):Partial<T> => {
  const finalObj: Partial<T> = {};

  for (const key of objectKey) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

export default pick;
