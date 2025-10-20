import { PDFDownloadLink } from "@react-pdf/renderer";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axiosInstance from "../../basedurl";
import Loader from "../../common/Loader";
import DownloadPdf from "./DownloadPdf";

const InvoicePDF = () => {
  const [pdfData, setPdfData] = useState(null);
  const [loader, setLoader] = useState(false);
  const { data } = useSelector((state) => state.profile);
  console.log(data);
  const formik = useFormik({
    initialValues: {
      Kundennummer: data?.customer_number,
      Krankenkasse: "",
      Klient: `${data?.first_name} ${data?.last_name}`,
      InsuranceNumber: "",
      Geburtsdatum: "",
      Pflegegrad: "",
      Leistungszeitpunkt: "",
      Leistung: "",
      Einzelpreis: "",
      Anzahl: "",
      Gesamtpreis: "",
      Nettobetrag: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setLoader(true);
      setPdfData(null);

      const formdata = new FormData();
      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          formdata.append(key, values[key]);
        }
      }
      axiosInstance
        .post(`generate/pdf`, values)
        .then((res) => {
          console.log(res);
          const { status, message, data } = res;
          if (status) {
            toast.success(message, {
              duration: 5000,
              position: "top-right",
            });
            formik.resetForm();
            setPdfData(data);
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

  return loader ? (
    <Loader />
  ) : (
    <>
      <div className="bg-white text-black w-full rounded-lg py-15 px-16 ">
        <h1 className="text-black text-[20px] font-[700]">
          Nachweis über einen Beratungsbesuch nach § 37 Abs. 3 SGB XI
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-start gap-5 w-full">
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                  name="nursing_insurance_number"
                  value={formik.values.nursing_insurance_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.nursing_insurance_number &&
                formik.errors.nursing_insurance_number ? (
                  <div className="text-danger">
                    {formik.errors.nursing_insurance_number}
                  </div>
                ) : null}
                <label htmlFor="">PLZ</label>
              </div>
              <div className="flex flex-col gap-2 w-[70%]">
                <input
                  type="text"
                  className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                  name="ort"
                  value={formik.values.ort}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ort && formik.errors.ort ? (
                  <div className="text-danger">{formik.errors.ort}</div>
                ) : null}
                <label htmlFor="">Ort</label>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                  name="plz"
                  value={formik.values.plz}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.plz && formik.errors.plz ? (
                  <div className="text-danger">{formik.errors.plz}</div>
                ) : null}
                <label htmlFor="">PLZ</label>
              </div>
              <div className="flex flex-col gap-2 w-[70%]">
                <input
                  type="text"
                  className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                  name="ort"
                  value={formik.values.ort}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ort && formik.errors.ort ? (
                  <div className="text-danger">{formik.errors.ort}</div>
                ) : null}
                <label htmlFor="">Ort</label>
              </div>
            </div>
          </div>
          <div className="mt-3">
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
                "Einreichen"
              )}
            </button>
          </div>{" "}
        </form>
      </div>
      {pdfData && (
        <PDFDownloadLink
          document={<DownloadPdf data={pdfData} />}
          fileName={`${pdfData?.name}.pdf`}
        >
          {({ url, loading }) => {
            if (!loading && url) {
              window.open(url); // Automatically opens the PDF in a new tab
            }
            return null; // Optionally return a fallback UI if needed
          }}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default InvoicePDF;
