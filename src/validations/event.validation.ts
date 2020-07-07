import * as yup from "yup";

export const eventInput = yup.object().shape({
  title: yup.string().min(3).max(255).required(),
  description: yup.string().min(3).max(1000).required(),
  date: yup.date().required(),
  location: yup.array(),
});
