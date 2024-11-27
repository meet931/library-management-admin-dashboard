import * as Yup from "yup";

// Yup validation schema
export const roleValidationSchema = Yup.object({
  role: Yup.string().required("Role name is required"),
  description: Yup.string().required("Description is required"),
});