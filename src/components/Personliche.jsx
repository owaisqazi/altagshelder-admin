import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../basedurl";
import Loader from "../common/Loader";
import moment from "moment/moment";

const Personliche = ({ setisActive }) => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [newData, setnewData] = useState(null);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => moment().year() - i);

  const getProfileData = () => {
    setLoader(true);
    axiosInstance
      .get(`get/user/personal/data/${id}`)
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
    customer_number: Yup.string().required("Kundennummer is required"),
    salutation: Yup.string().required("Anrede is required"),
    first_name: Yup.string().required("Vorname is required"),
    last_name: Yup.string().required("Name is required"),
    phone_number: Yup.string()
      .matches(/^[0-9]+$/, "Telefonnummer must be only numbers")
      .required("Telefonnummer is required"),
    street: Yup.string().required("Straße is required"),
    postal_code: Yup.string().required("PLZ is required"),
    city: Yup.string().required("Ort is required"),
    state: Yup.string().required("Bundesland is required"),
    email_address: Yup.string()
      .email("Invalid email address")
      .required("Mailadresse is required"),
    day: Yup.string().required("Day is required"),
    month: Yup.string().required("Month is required"),
    year: Yup.string().required("Year is required"),
  });

  const formik = useFormik({
    initialValues: {
      customer_number: newData?.customer_number ?? "",
      salutation: newData?.salutation ?? "",
      first_name: newData?.first_name ?? "",
      last_name: newData?.last_name ?? "",
      phone_number: newData?.phone_number ?? "",
      street: newData?.street ?? "",
      postal_code: newData?.postal_code ?? "",
      city: newData?.city ?? "",
      state: newData?.state ?? "",
      email_address: newData?.email_address ?? "",
      day: newData?.date_of_birth?.split("-")?.[0] ?? "",
      month: newData?.date_of_birth?.split("-")?.[1] ?? "",
      year: newData?.date_of_birth?.split("-")?.[2] ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoader(true);
      const newValues = {
        ...values,
        date_of_birth: `${values.day}-${values.month}-${values.year}`,
        user_id: id,
      };
      axiosInstance
        .post(`add/user/personal/data`, newValues)
        .then((res) => {
          const { status, message } = res;
          if (status) {
            toast.success(message, {
              duration: 5000,
              position: "top-right",
            });
            if (newData) {
              Navigate(`/add/user/pdf/${id}`);
              toast.success(`Please Update Your Signature`);
            } else {
              setisActive("versicherungsdaten");
              formik.resetForm();
              getProfileData();
            }
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
    <div className="w-full bg-white rounded-xl flex flex-col py-8 px-12 gap-1 items-end">
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="mb-3">
          <label htmlFor="customer_number" className="text-[17px] w-full">
            Kundennummer
          </label>
          <input
            type="text"
            id="customer_number"
            name="customer_number"
            placeholder="Kundennummer"
            className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md w-full"
            value={formik.values.customer_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.customer_number && formik.errors.customer_number ? (
            <div className="text-danger">{formik.errors.customer_number}</div>
          ) : null}
        </div>

        <div className="flex mb-3 gap-2 justify-between w-full">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="salutation" className="text-[17px]">
              Anrede
            </label>
            <input
              type="text"
              id="salutation"
              name="salutation"
              placeholder="Anrede"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.salutation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.salutation && formik.errors.salutation ? (
              <div className="text-danger">{formik.errors.salutation}</div>
            ) : null}
          </div>
        </div>

        <div className="flex mb-3 gap-2 justify-between w-full">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="first_name" className="text-[17px] ">
              Vorname
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Vorname"
              className="border outline-none focus:bg-[#e7eeff] border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div className="text-danger">{formik.errors.first_name}</div>
            ) : null}
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="last_name" className="text-[17px]">
              Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Name"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <div className="text-danger">{formik.errors.last_name}</div>
            ) : null}
          </div>
        </div>

        <div className="w-full mb-3">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="dateOfBirth" className="text-[17px]">
              Geburtsdatum
            </label>
            <div className="flex w-full gap-4 text-[15px] ">
              <select
                name="day"
                value={formik.values.day}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="rounded-md focus:bg-[#e7eeff] outline-none border w-[245px] border-[#dedede] py-[13px] px-6"
              >
                <option value="">Date</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                name="month"
                value={formik.values.month}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="rounded-md focus:bg-[#e7eeff] border outline-none w-[245px] border-[#dedede] py-[13px] px-6"
              >
                <option value="">Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                name="year"
                value={formik.values.year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="rounded-md focus:bg-[#e7eeff] border outline-none w-[245px] border-[#dedede] py-[13px] px-6"
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            {(formik.touched.day ||
              formik.touched.month ||
              formik.touched.year) && (
              <div className="text-danger">
                {formik.errors.day || formik.errors.month || formik.errors.year}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="street" className="text-[17px] mb-3 w-full">
            Straße
          </label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder="Straße"
            className="border focus:bg-[#e7eeff] border-[#dedede] py-3 px-6 outline-none rounded-md w-full"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.street && formik.errors.street ? (
            <div className="text-danger">{formik.errors.street}</div>
          ) : null}
        </div>

        <div className="flex mb-3 gap-2 justify-between w-full">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="postal_code" className="text-[17px]">
              PLZ
            </label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              placeholder="PLZ"
              className="border focus:bg-[#e7eeff] border-[#dedede] py-3 outline-none px-6 rounded-md"
              value={formik.values.postal_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.postal_code && formik.errors.postal_code ? (
              <div className="text-danger">{formik.errors.postal_code}</div>
            ) : null}
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="city" className="text-[17px]">
              Ort
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Ort"
              className="border focus:bg-[#e7eeff] border-[#dedede] outline-none py-3 px-6 rounded-md"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-danger">{formik.errors.city}</div>
            ) : null}
          </div>
        </div>
        <div className="flex mb-3 gap-2 justify-between w-full">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="state" className="text-[17px]">
              Bundesland
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Bundesland"
              className="border focus:bg-[#e7eeff] border-[#dedede] py-3 outline-none px-6 rounded-md"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.state && formik.errors.state ? (
              <div className="text-danger">{formik.errors.state}</div>
            ) : null}
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="phone_number" className="text-[17px]">
              Telefonnummer
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Telefonnummer"
              className="border focus:bg-[#e7eeff] border-[#dedede] py-3 outline-none px-6 rounded-md"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone_number && formik.errors.phone_number ? (
              <div className="text-danger">{formik.errors.phone_number}</div>
            ) : null}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="text-[17px] mt-5 w-full">
            Mailadresse
          </label>
          <input
            type="email"
            id="email"
            name="email_address"
            placeholder="Mailadresse"
            className="border focus:bg-[#e7eeff] border-[#dedede] py-3 px-6 outline-none rounded-md w-full"
            value={formik.values.email_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email_address && formik.errors.email_address ? (
            <div className="text-danger">{formik.errors.email_address}</div>
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

export default Personliche;
