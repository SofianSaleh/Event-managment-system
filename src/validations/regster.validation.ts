import * as yup from "yup";

export const regCredsValidation = yup.object().shape({
  firstName: yup.string().min(2).max(255),
  lastName: yup.string().min(2).max(255),
  date_of_birth: yup.date(),
  username: yup
    .string()
    .min(4)
    .max(255)
    .trim()
    .matches(/\S/, `The username includes white spaces`)
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(255).required(),
});
