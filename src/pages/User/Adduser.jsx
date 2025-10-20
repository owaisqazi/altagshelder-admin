/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../basedurl";
import {
  initialValuesSignup,
  validationSchemaSignup,
} from "../Authentication/schema";
import { fetchUsers } from "../../store/userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Adduser = ({ onHide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValuesSignup,
      validationSchema: validationSchemaSignup,
      onSubmit: (values) => {
        setLoader(true);
        axiosInstance
          .post("add/user", values)
          .then((res) => {
            console.log(res.data);
            const { status, message, data } = res;
            if (status) {
              // Check status code
              toast.success(message, {
                duration: 5000,
                position: "top-right",
              });
              onHide();
              dispatch(fetchUsers());

              navigate(`/updateUser/${data.id}`);
              setLoader(false);
            } else {
              toast.error(message, {
                duration: 5000,
                position: "top-right",
              });
              setLoader(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setLoader(false);
          });
      },
    });
  console.log(errors, "fromikerros");
  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              name: "vollständiger_name",
              key: "full_name",
              type: "text",
            },
            { name: "alter", key: "age", type: "date" },
            { name: "email", key: "email", type: "email" },
            { name: "kontakt", key: "contact", type: "tel" },
            // { name: "password", key: "password", type: "password" },
            // {
            //   name: "confirm_password",
            //   key: "password_confirmation",
            //   type: "password",
            // },
          ].map((field) => (
            <div className="relative mb-3" key={field.name}>
              <input
                type={field.type}
                placeholder={field.name.replace(/_/g, " ").toLocaleUpperCase()}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                name={field.key}
                value={values[field.key]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched[field.key] && errors[field.key] ? (
                <div className="text-danger text-sm mt-2">
                  {errors[field.key]}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-3">
          <button
            type="submit"
            disabled={loader}
            className="w-full cursor-pointer rounded-lg bg-[#2F93F6] p-4 text-white transition hover:bg-opacity-90"
          >
            {loader ? (
              <div role="status">
                <div className="flex justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
                </div>
              </div>
            ) : (
              "Add user"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Adduser;
