export const responseFormatter = (
  success: boolean,
  msg: string,
  other: any
) => {
  return {
    success,
    msg,
    other,
  };
};
