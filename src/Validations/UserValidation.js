import * as yup from "yup";

const formSchema = yup.object().shape({

  email: yup.string().email().required(),
  password: yup.string().min(5).max(13).required(),
});
export  default formSchema;