/* eslint-disable react/no-unknown-property */
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../basedurl";
import logo from "../../images/logo/logo.png";
import { initialValuesSignin, validationSchemaSignin } from "./schema";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const [Hide, setHide] = useState(false);
  const [loader, setLoader] = useState(false);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValuesSignin,
      validationSchema: validationSchemaSignin,
      onSubmit: (values) => {
        setLoader(true);
        const formData = new FormData();
        formData.append("login_identifier", values.email);
        formData.append("password", values.password);
        axiosInstance
          .post("login", formData)
          .then((res) => {
            console.log(res);
            const { status, message, data, token } = res;
            if (status) {
              toast.success(message, {
                duration: 5000,
                position: "top-right",
              });

              localStorage.setItem("token", token);
              localStorage.setItem("user", JSON.stringify(data));
              navigate("/dashboard");
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

  return (
    <>
      <div className="rounded-sm border bg-white shadow-default dark:border-strokedark min-h-screen overflow-hidden">
        <img src={logo} className="mt-1" alt="" />
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full p-4 sm:p-10.5 xl:p-15.5">
              <form
                onSubmit={handleSubmit}
                className="shadow-2xl p-7 rounded-2xl bg-white"
              >
                <div className="flex justify-center items-center ">
                  <div className="text-xl mb-3 text-black dark:text-white">
                    Willkommen bei
                    <span className="font-bold">&nbsp;All Tag Shelden </span>
                  </div>
                </div>
                <div className="text-4xl mb-3 text-black text-center dark:text-white  ">
                  Anmelden
                </div>

                <div className="mb-4 ">
                  <label className="text-[15.5px] mb-2.5 block font-medium text-black dark:text-white">
                    Geben Sie Ihren Benutzernamen oder Ihre E-Mail-Adresse ein
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Benutzername oder E-mail Adresse"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                    {errors.email && touched.email ? (
                      <span className="text-danger fs-6 m-2">
                        {errors.email}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-[15.5px] mb-2.5 block font-medium text-black dark:text-white">
                    Geben Sie Ihr Passwort ein
                  </label>
                  <div className="relative">
                    <input
                      type={Hide ? "text" : "password"}
                      placeholder="Password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />

                    <span
                      className="absolute right-4 top-4"
                      onClick={() => setHide(!Hide)}
                    >
                      {Hide ? (
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-width="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            stroke-width="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </span>
                    {errors.password && touched.password ? (
                      <span className="text-danger fs-6 m-2">
                        {errors.password}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="mb-2 text-[#2F93F6] text-end">
                  <Link to={"/forgotpass"}>Passwort vergessen?</Link>
                </div>
                <div className="mb-1">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg bg-[#2F93F6] p-4 text-white transition hover:bg-opacity-90"
                  >
                    {loader ? (
                      <div role="status">
                        <div className="flex justify-center">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
                        </div>
                      </div>
                    ) : (
                      "Anmelden"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
