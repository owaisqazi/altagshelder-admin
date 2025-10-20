import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../basedurl";
import Loader from "../common/Loader";

const Pflegekasse = ({ setisActive }) => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [newData, setnewData] = useState(null);

  const getProfileData = () => {
    setLoader(true);
    axiosInstance
      .get(`get/user/care/fund/data/${id}`)
      .then((res) => {
        const { status, message, data } = res;
        if (status) {
          setnewData(data);
        } else {
          toast.error(message, {
            duration: 5000,
            position: "top-right",
          });
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    getProfileData();
  }, []);
  const validationSchema = Yup.object({
    care_fund_name: Yup.string().required("Name is required"),
    care_fund_street: Yup.string().required("Straße is required"),
    care_fund_postal_code: Yup.string().required("PLZ is required"),
    care_fund_city: Yup.string().required("Ort is required"),
    care_fund_phone_number: Yup.string()
      .required("Telefonnummer is required")
      .matches(/^[0-9]+$/, "Phone number must be only digits"),
    care_fund_email_address: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      care_fund_name: newData?.name ?? "",
      care_fund_street: newData?.street ?? "",
      care_fund_postal_code: newData?.postal_code ?? "",
      care_fund_city: newData?.city ?? "",
      care_fund_phone_number: newData?.phone_number ?? "",
      care_fund_email_address: newData?.email_address ?? "",
      user_id: id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoader(true);

      axiosInstance
        .post(`add/user/care/fund`, values)
        .then((res) => {
          const { status, message } = res;
          if (status) {
            toast.success(message, {
              duration: 5000,
              position: "top-right",
            });
            formik.resetForm();
            getProfileData();
            setisActive("kontaktperson");
          } else {
            toast.error(message, {
              duration: 5000,
              position: "top-right",
            });
          }
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    },
    enableReinitialize: true, // Add this line
  });

  return loader ? (
    <Loader />
  ) : (
    <div className="w-full bg-white rounded-xl flex flex-col py-8 px-12 gap-3 items-end">
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="mb-3">
          <label htmlFor="care_fund_name" className="text-[17px] w-full">
            Name
          </label>
          <input
            type="text"
            id="care_fund_name"
            name="care_fund_name"
            placeholder="Name"
            className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md w-full"
            value={formik.values.care_fund_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.care_fund_name && formik.errors.care_fund_name ? (
            <div className="text-danger">{formik.errors.care_fund_name}</div>
          ) : null}
        </div>

        <div className="flex gap-2 justify-between w-full">
          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="care_fund_street" className="text-[17px]">
              Straße
            </label>
            <input
              type="text"
              id="care_fund_street"
              name="care_fund_street"
              placeholder="Straße"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.care_fund_street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.care_fund_street &&
            formik.errors.care_fund_street ? (
              <div className="text-danger">
                {formik.errors.care_fund_street}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="care_fund_postal_code" className="text-[17px]">
              PLZ
            </label>
            <input
              type="text"
              id="care_fund_postal_code"
              name="care_fund_postal_code"
              placeholder="PLZ"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.care_fund_postal_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.care_fund_postal_code &&
            formik.errors.care_fund_postal_code ? (
              <div className="text-danger">
                {formik.errors.care_fund_postal_code}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="care_fund_city" className="text-[17px]">
            Ort
          </label>
          <input
            type="text"
            id="care_fund_city"
            name="care_fund_city"
            placeholder="Ort"
            className="border focus:bg-[#e7eeff] border-[#dedede] outline-none py-3 px-6 rounded-md w-full"
            value={formik.values.care_fund_city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.care_fund_city && formik.errors.care_fund_city ? (
            <div className="text-danger">{formik.errors.care_fund_city}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="care_fund_phone_number" className="text-[17px]">
            Telefonnummer
          </label>
          <input
            type="text"
            id="care_fund_phone_number"
            name="care_fund_phone_number"
            placeholder="Telefonnummer"
            className="border focus:bg-[#e7eeff] border-[#dedede] outline-none py-3 px-6 rounded-md w-full"
            value={formik.values.care_fund_phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.care_fund_phone_number &&
          formik.errors.care_fund_phone_number ? (
            <div className="text-danger">
              {formik.errors.care_fund_phone_number}
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="care_fund_email_address" className="text-[17px]">
            Emailadresse
          </label>
          <input
            type="text"
            id="care_fund_email_address"
            name="care_fund_email_address"
            placeholder="Emailadresse"
            className="border focus:bg-[#e7eeff] border-[#dedede] outline-none py-3 px-6 rounded-md w-full"
            value={formik.values.care_fund_email_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.care_fund_email_address &&
          formik.errors.care_fund_email_address ? (
            <div className="text-danger">
              {formik.errors.care_fund_email_address}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-[#4880ff] text-white py-3 mt-6 px-11 rounded-lg w-[22%]"
        >
          Nächste
        </button>
      </form>
    </div>
  );
};

export default Pflegekasse;
