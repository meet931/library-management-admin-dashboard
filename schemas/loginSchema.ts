import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain lowercase letters")
    .matches(/[A-Z]/, "Password must contain uppercase letters")
    .matches(/[0-9]/, "Password must contain numbers")
    .matches(/[^A-Za-z0-9]/, "Password must contain special characters"),
});
