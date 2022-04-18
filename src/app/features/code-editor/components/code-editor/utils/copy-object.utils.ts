export const copyObject = <T>(object: T): T => {
  return JSON.parse(JSON.stringify(object));
};
