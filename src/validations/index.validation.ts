import { formatYupErrors } from "src/helpers/errorHandler.helper";

export const validate = async (schema: any, args: any) => {
  try {
    return await schema.validate(args, { abortEarly: false });
  } catch (error) {
    return formatYupErrors(error);
  }
};
