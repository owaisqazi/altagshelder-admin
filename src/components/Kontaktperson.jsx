import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import axiosInstance from "../basedurl";
import Loader from "../common/Loader";
import { useNavigate, useParams } from "react-router-dom";

const Kontaktperson = () => {
  const { id } = useParams("");
  const [loader, setLoader] = useState(false);
  const [newData, setnewData] = useState(null);
  const Navigate = useNavigate(null);
  const getProfileData = () => {
    setLoader(true);
    axiosInstance
      .get(`get/user/contact/data/${id}`)
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
    contact_salutation: Yup.string().required("Salutation is required"),
    contact_first_name: Yup.string().required("First Name is required"),
    contact_last_name: Yup.string().required("Last Name is required"),
    contact_date_of_birth: Yup.date().required("Date of Birth is required"),
    contact_street: Yup.string().required("Street is required"),
    contact_postal_code: Yup.string().required("Postal Code is required"),
    contact_city: Yup.string().required("City is required"),
    contact_state: Yup.string().required("State is required"),
    contact_phone_number: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be digits")
      .required("Phone number is required"),
    contact_email_address: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      contact_salutation: newData?.salutation ?? "",
      contact_first_name: newData?.first_name ?? "",
      contact_last_name: newData?.last_name ?? "",
      contact_date_of_birth: newData?.date_of_birth ?? "",
      contact_street: newData?.street ?? "",
      contact_postal_code: newData?.postal_code ?? "",
      contact_city: newData?.city ?? "",
      contact_state: newData?.state ?? "",
      contact_phone_number: newData?.phone_number ?? "",
      contact_email_address: newData?.email_address ?? "",
      user_id: id,
    },
    validationSchema,
    onSubmit: (values) => {
      setLoader(true);

      axiosInstance
        .post(`add/user/contact/data`, values)
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
    <div className="w-full bg-white rounded-xl flex flex-col py-8 px-12 gap-3 items-end">
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="flex mt-3 gap-2 justify-between w-full">
          <div className="flex flex-col w-full gap-3 mb-3">
            <label htmlFor="contact_salutation" className="text-[17px]">
              Anrede
            </label>
            <input
              type="text"
              id="contact_salutation"
              name="contact_salutation"
              placeholder="Anrede"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.contact_salutation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.contact_salutation &&
            formik.errors.contact_salutation ? (
              <div className="text-danger">
                {formik.errors.contact_salutation}
              </div>
            ) : null}
          </div>
          {/* <div className="flex flex-col w-full gap-3 mb-3">
            <label htmlFor="contact_salutation" className="text-[17px]">
              Mr./Ms
            </label>
            <select
              name="contact_salutation"
              value={formik.values.contact_salutation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-[13px] px-6 rounded-md w-full"
            >
              <option value="">Mr./Ms</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
            </select>
            {formik.touched.contact_salutation &&
            formik.errors.contact_salutation ? (
              <div className="text-danger">
                {formik.errors.contact_salutation}
              </div>
            ) : null}
          </div> */}
        </div>
        <div className="flex mt-3 gap-2 justify-between w-full">
          <div className="flex flex-col w-full gap-3 mb-3">
            <label htmlFor="contact_first_name" className="text-[17px]">
              Vorname
            </label>
            <input
              type="text"
              id="contact_first_name"
              name="contact_first_name"
              placeholder="Vorname"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.contact_first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.contact_first_name &&
            formik.errors.contact_first_name ? (
              <div className="text-danger">
                {formik.errors.contact_first_name}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col w-full gap-3 mb-3">
            <label htmlFor="contact_last_name" className="text-[17px]">
              Name
            </label>
            <input
              type="text"
              id="contact_last_name"
              name="contact_last_name"
              placeholder="Name"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.contact_last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.contact_last_name &&
            formik.errors.contact_last_name ? (
              <div className="text-danger">
                {formik.errors.contact_last_name}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full mb-3">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="contact_date_of_birth" className="text-[17px]">
              Geburtsdatum
            </label>
            <input
              type="text"
              id="contact_date_of_birth"
              name="contact_date_of_birth"
              placeholder="6-11-1996"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md w-full"
              value={formik.values.contact_date_of_birth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.contact_date_of_birth &&
            formik.errors.contact_date_of_birth ? (
              <div className="text-danger">
                {formik.errors.contact_date_of_birth}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="contact_street" className="text-[17px]">
            Straße
          </label>
          <input
            type="text"
            id="contact_street"
            name="contact_street"
            placeholder="Straße"
            className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md w-full"
            value={formik.values.contact_street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contact_street && formik.errors.contact_street ? (
            <div className="text-danger">{formik.errors.contact_street}</div>
          ) : null}
        </div>
        <div className="flex mb-3 gap-3 justify-between w-full">
          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="contact_postal_code" className="text-[17px]">
              PLZ
            </label>
            <input
              type="text"
              id="contact_postal_code"
              name="contact_postal_code"
              placeholder="PLZ"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.contact_postal_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.contact_postal_code &&
            formik.errors.contact_postal_code ? (
              <div className="text-danger">
                {formik.errors.contact_postal_code}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="contact_city" className="text-[17px]">
              Ort
            </label>
            <input
              type="text"
              id="contact_city"
              name="contact_city"
              placeholder="Ort"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.contact_city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.contact_city && formik.errors.contact_city ? (
              <div className="text-danger">{formik.errors.contact_city}</div>
            ) : null}
          </div>
        </div>
        <div className="flex mb-3 gap-2 justify-between w-full">
          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="contact_state" className="text-[17px]">
              Bundesland
            </label>
            <input
              type="text"
              id="contact_state"
              name="contact_state"
              placeholder="Bundesland"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.contact_state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.contact_state && formik.errors.contact_state ? (
              <div className="text-danger">{formik.errors.contact_state}</div>
            ) : null}
          </div>
          <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor="contact_phone_number" className="text-[17px]">
              Telefonnummer
            </label>
            <input
              type="text"
              id="contact_phone_number"
              name="contact_phone_number"
              placeholder="Telefonnummer"
              className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md"
              value={formik.values.contact_phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.contact_phone_number &&
            formik.errors.contact_phone_number ? (
              <div className="text-danger">
                {formik.errors.contact_phone_number}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="contact_email_address" className="text-[17px]">
            Mailadresse
          </label>
          <input
            type="text"
            id="contact_email_address"
            name="contact_email_address"
            placeholder="Mailadresse"
            className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 rounded-md w-full"
            value={formik.values.contact_email_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contact_email_address &&
          formik.errors.contact_email_address ? (
            <div className="text-danger">
              {formik.errors.contact_email_address}
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

export default Kontaktperson;
