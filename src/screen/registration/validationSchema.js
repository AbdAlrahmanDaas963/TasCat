import * as yup from "yup";

export const validationsSignupForm = {
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string().required("Required"),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Confirm your password"),
};

export const validationsLoginForm = {
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
};
