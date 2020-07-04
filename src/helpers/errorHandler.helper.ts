import { ValidationError } from "yup";

export const formatYupErrors = async (err: ValidationError) => {
  const errors: Array<{ path: string; msg: string }> = [];
  err.inner.forEach((e) => {
    errors.push({
      path: e.path,
      msg: e.message,
    });
  });
  return errors;
};

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
