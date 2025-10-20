import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import axiosInstance from "../basedurl";
import Loader from "../common/Loader";
import { useParams } from "react-router-dom";

const Versicherungsdaten = ({ setisActive }) => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [newData, setnewData] = useState(null);
  const getProfileData = () => {
    setLoader(true);
    axiosInstance
      .get(`get/user/insurance/data/${id}`)
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
    care_insurance_number: Yup.string().required(
      "Pflegeversichertennummer is required"
    ),
    insured: Yup.string().required("Versichert is required"),
    care_level: Yup.string().required("Pflegegrad is required"),
  });

  const formik = useFormik({
    initialValues: {
      care_insurance_number: newData?.care_insurance_number ?? "",
      insured: newData?.insured ?? "",
      care_level: newData?.care_level ?? "",
      user_id: id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoader(true);

      axiosInstance
        .post(`add/user/insurance/data`, values)
        .then((res) => {
          const { status, message } = res;
          if (status) {
            toast.success(message, {
              duration: 5000,
              position: "top-right",
            });
            formik.resetForm();
            getProfileData();
            setisActive("pflegekasse");
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
        <div className="mb-5">
          <label htmlFor="care_insurance_number" className="text-[17px] w-full">
            Pflegeversichertennummer
          </label>
          <input
            type="text"
            id="care_insurance_number"
            name="care_insurance_number"
            placeholder="Pflegeversichertennummer"
            className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-3 px-6 w-full rounded-md"
            value={formik.values.care_insurance_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.care_insurance_number &&
          formik.errors.care_insurance_number ? (
            <div className="text-danger">
              {formik.errors.care_insurance_number}
            </div>
          ) : null}
        </div>

        <div className="mb-5">
          <label htmlFor="insured" className="text-[17px] w-full">
            Versichert
          </label>
          <input
            type="text"
            id="insured"
            name="insured"
            placeholder="Versichert"
            className="border focus:bg-[#e7eeff] border-[#dedede] outline-none py-3 px-6 rounded-md w-full"
            value={formik.values.insured}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.insured && formik.errors.insured ? (
            <div className="text-danger">{formik.errors.insured}</div>
          ) : null}
        </div>

        <div className="mb-5">
          <label htmlFor="care_level" className="text-[17px] w-full">
            Pflegegrad
          </label>
          <input
            type="text"
            id="care_level"
            name="care_level"
            placeholder="Pflegegrad"
            className="border focus:bg-[#e7eeff] border-[#dedede] outline-none py-3 px-6 rounded-md w-full"
            value={formik.values.care_level}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.care_level && formik.errors.care_level ? (
            <div className="text-danger">{formik.errors.care_level}</div>
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

export default Versicherungsdaten;
