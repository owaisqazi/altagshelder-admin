import * as Yup from "yup";

export const validationSchemaSignin = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const initialValuesSignin = {
  email: "admin@gmail.com",
  password: "12345678",
};

export const validationSchemaSignup = Yup.object({
  full_name: Yup.string().required("Vollständiger Name is required"),
  age: Yup.string().required("Alter is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contact: Yup.string()
    // .matches(/^[0-9]+$/, "Kontakt must be only Number")
    .required("Kontakt is required"),
  // password: Yup.string().required("Password is required"),
  // password_confirmation: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "Passwords must match")
  //   .required("Confirm Password is required"),
});

export const initialValuesSignup = {
  full_name: "",
  age: "",
  email: "",
  contact: "",
  // password: "",
  // password_confirmation: "",
};
