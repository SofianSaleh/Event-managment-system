import { formatYupErrors } from "../helpers/errorHandler.helper";

export const validate = async (schema: any, args: any) => {
  try {
    await schema.validate(args, { abortEarly: false });
    return true;
  } catch (error) {
    return formatYupErrors(error);
  }
};
