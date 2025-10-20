import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SignaturePad from "react-signature-canvas";
import * as Yup from "yup";
import axiosInstance from "../../basedurl";
import Loader from "../../common/Loader";
import { flattenCompanyData } from "../../hooks/FlattenData";
import { fetchPersonalData } from "../../store/profileslice";
import UploadingPdfs from "./uploadingPdfs";

const PDF = () => {
  const [uploadProgress, setUploadProgress] = useState(null);

  const { data: userData } = useSelector((state) => state.profile);
  const data = userData && flattenCompanyData(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [oldpdf, setOldpdf] = useState(null);
  const [loader, setLoader] = useState(false);
  const initialValues = {
    nursing_insurance_number: data?.customer_number,
    name: data?.first_name,
    vorname: data?.last_name,
    brith_data: data?.date_of_birth,
    straße: data?.street,
    plz: data?.postal_code,
    ort: data?.state,
    person_need_care: oldpdf?.person_need_care || "",
    period: oldpdf?.period || "",
    clock_until: oldpdf?.clock_until || "",
    care_support_situation: oldpdf?.care_support_situation || "",
    counsellors_point_of_view: oldpdf?.counsellors_point_of_view || "",
    consultants_assessment: oldpdf?.consultants_assessment || "",
    because: oldpdf?.because || "",
    no_no_measures_are_suggested:
      oldpdf?.no_no_measures_are_suggested === 1 ? true : false,
    yes_the_following_measures_are_suggested:
      oldpdf?.yes_the_following_measures_are_suggested === 1 ? true : false,
    care_course_training: oldpdf?.care_course_training === 1 ? true : false,
    combination_benefit: oldpdf?.combination_benefit === 1 ? true : false,
    substitute_care: oldpdf?.substitute_care === 1 ? true : false,
    rehabilitation_services:
      oldpdf?.rehabilitation_services === 1 ? true : false,
    day_night_care: oldpdf?.day_night_care === 1 ? true : false,
    offers_to_support_everyday_life:
      oldpdf?.offers_to_support_everyday_life === 1 ? true : false,
    care_aids_technical_aids:
      oldpdf?.care_aids_technical_aids === 1 ? true : false,
    reassessment_of_care: oldpdf?.reassessment_of_care === 1 ? true : false,
    care_benefits_in_kind: oldpdf?.care_benefits_in_kind === 1 ? true : false,
    short_term_care: oldpdf?.short_term_care === 1 ? true : false,
    home_adaptation: oldpdf?.home_adaptation === 1 ? true : false,
    leisure_options_care_time_family_care_time:
      oldpdf?.leisure_options_care_time_family_care_time === 1 ? true : false,
    further_measures_and_explanations_of_the_above_measures:
      oldpdf?.further_measures_and_explanations_of_the_above_measures === 1
        ? true
        : false,
    further_measures_and_explanations_of_the_above_measures_detail:
      oldpdf?.further_measures_and_explanations_of_the_above_measures_detail ||
      "",
    counselors_point_of_view:
      oldpdf?.counselors_point_of_view === 1 ? true : false,
    information: oldpdf?.information === 1 ? true : false,
    agree_to_the_transmission_of_the_information_3:
      oldpdf?.agree_to_the_transmission_of_the_information_3 === 1
        ? true
        : false,
    agree_to_the_transmission_of_the_information_4:
      oldpdf?.agree_to_the_transmission_of_the_information_4 === 1
        ? true
        : false,
    further_care_advice_according_to_7a_SGB:
      oldpdf?.further_care_advice_according_to_7a_SGB === 1 ? true : false,
    my_nursing_care_fund_or_my_private_insurance_company:
      oldpdf?.my_nursing_care_fund_or_my_private_insurance_company === 1
        ? true
        : false,
    nursing_care_advice_in_accordance_with_Section_7aSGB:
      oldpdf?.nursing_care_advice_in_accordance_with_Section_7aSGB === 1
        ? true
        : false,
    place_date: oldpdf?.place_date || "",
    the_assessments_made_for_the_person_in_need_of_care:
      oldpdf?.the_assessments_made_for_the_person_in_need_of_care === 1
        ? true
        : false,
    copy_of_the_certificate_was_given_to_the_person_in_need_of_care:
      oldpdf?.copy_of_the_certificate_was_given_to_the_person_in_need_of_care ===
      1
        ? true
        : false,
    IK_of_the_nursing_service: oldpdf?.IK_of_the_nursing_service || "",
    longer_name: oldpdf?.longer_name || "",
    name2: userData?.care_fund_data?.name || "",
    Straße2: userData?.care_fund_data?.street || "",
    PLZ2: userData?.care_fund_data?.postal_code || "",
    Ort2: userData?.care_fund_data?.city || "",
    signature: oldpdf?.signature || null,
    signature1: oldpdf?.signature1 || null,
    user_id: id,
    id: oldpdf?.invoice_generated === 0 ? oldpdf.id : null,
  };
  const getPDF = () => {
    setLoader(true);

    axiosInstance.get(`get/user/pdf/content/by/user/${id}`).then((response) => {
      const { data, message, status } = response;
      if (status) {
        setOldpdf(data);
        setLoader(false);
      } else {
        toast.error(message);
        setLoader(false);
      }
    });
  };
  const Schema = Yup.object({
    signature: Yup.string().required("Signature is required"),
    signature1: Yup.string().required("Signature is required"),
    plz: Yup.string()

      .matches(/^\d{1,5}$/, "PLZ must be a maximum of 5 digits"),
    PLZ2: Yup.string()

      .matches(/^\d{1,5}$/, "PLZ must be a maximum of 5 digits"),
  });
  const sigNAPad = useRef(null);
  const sigNAPad1 = useRef(null);

  const Clears1 = () => {
    // sigNAPad.current.clear();
    formik.setValues((prevValues) => ({
      ...prevValues,
      signature: "",
    }));
  };

  const Saves1 = () => {
    if (sigNAPad.current) {
      const data = sigNAPad.current.getTrimmedCanvas().toDataURL("image/png");
      formik.setValues((prevValues) => ({
        ...prevValues,
        signature: data,
      }));
    }
  };

  const Clears2 = () => {
    // sigNAPad1.current.clear();
    formik.setValues((prevValues) => ({
      ...prevValues,
      signature1: "",
    }));
  };

  const Saves2 = () => {
    if (sigNAPad1.current) {
      const data = sigNAPad1.current.getTrimmedCanvas().toDataURL("image/png");
      formik.setValues((prevValues) => ({
        ...prevValues,
        signature1: data,
      }));
    }
  };
  const mainOptions = [
    {
      id: "checkbox1",
      label: "Nein, es werden keine Maßnahmen angeregt.",
      key: "no_no_measures_are_suggested",
    },
    {
      id: "checkbox2",
      label: "Ja, es werden folgende Maßnahmen angeregt.",
      key: "yes_the_following_measures_are_suggested",
    },
  ];
  const additionalOptions = [
    {
      id: "checkbox3",
      label: "Pflegekurs/-schulung",
      key: "care_course_training",
    },
    {
      id: "checkbox4",
      label: "Kombinationsleistung",
      key: "combination_benefit",
    },
    { id: "checkbox5", label: "Verhinderungspflege", key: "substitute_care" },
    {
      id: "checkbox6",
      label: "Rehabilitationsleistungen",
      key: "rehabilitation_services",
    },
    { id: "checkbox7", label: "Tages-/Nachtpflege", key: "day_night_care" },
    {
      id: "checkbox8",
      label: "Angebote zur Unterstützung im Alltag",
      key: "offers_to_support_everyday_life",
    },
    {
      id: "checkbox9",
      label: "Pflege-/Hilfsmittel/technische Hilfen",
      key: "care_aids_technical_aids",
    },
    {
      id: "checkbox10",
      label: "erneute Pflegebegutachtung",
      key: "reassessment_of_care",
    },
    {
      id: "checkbox11",
      label: "Pflegesachleistungen",
      key: "care_benefits_in_kind",
    },
    { id: "checkbox12", label: "Kurzzeitpflege", key: "short_term_care" },
    { id: "checkbox13", label: "Wohnraumanpassung", key: "home_adaptation" },
    {
      id: "checkbox14",
      label: "Freizeitmöglichkeiten Pflegezeit/ Familienpflegezeit",
      key: "leisure_options_care_time_family_care_time",
    },
  ];
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setLoader(true);
      setPdfData(null);
      const newValues = {
        ...values,
        id: oldpdf?.invoice_generated === 0 ? oldpdf.id : null,
        // plz: JSON.stringify(values.plz),
        // PLZ2: JSON.stringify(values.PLZ2),
      };

      const formdata = new FormData();

      for (const key in newValues) {
        if (Object.prototype.hasOwnProperty.call(newValues, key)) {
          formdata.append(key, newValues[key]);
        }
      }
      axiosInstance
        .post(`generate/user/pdf`, newValues)
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
            getPDF();
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

  useEffect(() => {
    getPDF();
    dispatch(fetchPersonalData(id));
  }, []);
  useEffect(() => {
    if (uploadProgress) {
      toast.loading(uploadProgress, { id: "uploadProgress" });
    } else {
      toast.dismiss("uploadProgress");
    }
  }, [uploadProgress]);
  return loader ? (
    <Loader />
  ) : (
    <>
      <div className="bg-white text-black w-full rounded-lg py-15 px-16  flex flex-col items-center">
        <h1 className="text-black text-[20px] font-[700]">
          Nachweis über einen Beratungsbesuch nach § 37 Abs. 3 SGB XI
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col items-start gap-5 w-full">
            <div>
              <h3 className="text-black text-[16px] font-[700] mt-6">
                Angaben zur pflegebedürftigen Person:
              </h3>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                className="border w-[70%] focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
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

              <label>
                Pflegeversichertennummer (ggf. entspricht diese der
                Krankenversichertennummer)
              </label>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                className="border w-[70%] focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
              <label htmlFor="">Name</label>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                className="border w-[70%] focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                name="vorname"
                value={formik.values.vorname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.vorname && formik.errors.vorname ? (
                <div className="text-danger">{formik.errors.vorname}</div>
              ) : null}
              <label htmlFor="">Vorname</label>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                className="border w-[70%] focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                name="brith_data"
                value={formik.values.brith_data}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.brith_data && formik.errors.brith_data ? (
                <div className="text-danger">{formik.errors.brith_data}</div>
              ) : null}
              <label htmlFor="">Geburtsdatum</label>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                className="border w-[70%] focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                name="straße"
                value={formik.values.straße}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.straße && formik.errors.straße ? (
                <div className="text-danger">{formik.errors.straße}</div>
              ) : null}

              <label className="text-[17px]">Straße</label>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-2">
                <input
                  type="tel"
                  className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                  maxLength={5}
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
            <div className="flex gap-6 items-center">
              <label>Bei der o.a. pflegebedürftigen Person wurde am</label>
              <input
                type="text"
                className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                name="person_need_care"
                value={formik.values.person_need_care}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.person_need_care &&
              formik.errors.person_need_care ? (
                <div className="text-danger">
                  {formik.errors.person_need_care}
                </div>
              ) : null}
            </div>
            <div className="flex gap-2 w-full">
              <div className="flex items-center gap-4 w-full">
                <label htmlFor="">in der Zeit* von</label>
                <input
                  type="text"
                  className="border focus:bg-[#e7eeff] w-[55%] outline-none border-[#dedede] py-2 px-6 rounded-md"
                  name="period"
                  value={formik.values.period}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.period && formik.errors.period ? (
                  <div className="text-danger">{formik.errors.period}</div>
                ) : null}
              </div>
              <div className="flex items-center gap-4 w-full">
                <label htmlFor="">Uhr bis</label>
                <input
                  type="time"
                  className="border focus:bg-[#e7eeff] w-[55%] outline-none border-[#dedede] py-2 px-6 rounded-md"
                  name="clock_until"
                  value={formik.values.clock_until}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.clock_until && formik.errors.clock_until ? (
                  <div className="text-danger">{formik.errors.clock_until}</div>
                ) : null}
              </div>
              <div className="flex items-center gap-4 w-full">
                <label htmlFor="">Uhr ein Beratungsbesuch durchgeführt.</label>
                {/* <input type="text" className='border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md' /> */}
              </div>
            </div>

            <p className="text-[#BF0000]">
              <span className="font-[800]">Hinweis: </span> Die nachfolgenden
              Einschätzungen werden von der Beratungsperson dokumentiert:
            </p>

            <div className="flex flex-col gap-2">
              <label htmlFor="">
                1. Die Pflege- und Betreuungssituation wird aus Sicht der
                pflegebedürftigen Person sowie der Pflegeperson wie folgt
                eingeschätzt:
              </label>
              <textarea
                rows="6"
                maxLength="480"
                className="outline-none border resize-none focus:bg-[#e7eeff] border-[#dedede] py-2 px-6 rounded-md"
                name="care_support_situation"
                value={formik.values.care_support_situation}
                onChange={(event) => {
                  const value = event.target.value;
                  // Count the number of lines (newlines)
                  const lineCount = value.split("\n").length;
                  console.log(lineCount, "lineCount");
                  // Allow input only if the number of lines is less than or equal to 5
                  if (lineCount <= 6) {
                    formik.handleChange(event);
                    console.log(event);
                  } else {
                    // Prevent user from adding more lines if already 5 lines
                    event.preventDefault();
                  }
                }}
                onBlur={formik.handleBlur}
              />

              {formik.touched.care_support_situation &&
              formik.errors.care_support_situation ? (
                <div className="text-danger">
                  {formik.errors.care_support_situation}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <label htmlFor="">
                2. Die Pflege- und Betreuungssituation wird aus Sicht der
                Beratungsperson wie folgt eingeschätzt:
              </label>
              <textarea
                id=""
                rows="6"
                maxLength="480"
                className="w-[100%] resize-none outline-none border focus:bg-[#e7eeff] border-[#dedede] py-2 px-6 rounded-md"
                name="counsellors_point_of_view"
                value={formik.values.counsellors_point_of_view}
                onChange={(event) => {
                  const value = event.target.value;
                  // Count the number of lines (newlines)
                  const lineCount = value.split("\n").length;

                  // Allow input only if the number of lines is less than or equal to 5
                  if (lineCount <= 6) {
                    formik.handleChange(event);
                  }
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.counsellors_point_of_view &&
              formik.errors.counsellors_point_of_view ? (
                <div className="text-danger">
                  {formik.errors.counsellors_point_of_view}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 items-start">
              <div>
                <label htmlFor="">
                  3. Nach Einschätzung der Beratungsperson ist die Pflege- und
                  Betreuungssituation sichergestellt:
                </label>
              </div>
              <div className="flex justify-between w-[40%] pl-4">
                <label htmlFor="checkbox1" className="flex space-x-1">
                  <input
                    type="radio"
                    id="checkbox1"
                    name="consultants_assessment"
                    value={"Yes"}
                    className="form-checkbox"
                    checked={formik.values.consultants_assessment === "Yes"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  <span>Ja</span>
                </label>
                <label htmlFor="checkbox2" className="flex space-x-1">
                  <input
                    type="radio"
                    id="checkbox2"
                    name="consultants_assessment"
                    className="form-checkbox"
                    value={"No"}
                    checked={formik.values.consultants_assessment === "No"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span>Nein</span>
                </label>
              </div>
              {formik.touched.consultants_assessment &&
              formik.errors.consultants_assessment ? (
                <div className="text-danger">
                  {formik.errors.consultants_assessment}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <label htmlFor="">Weil</label>
              <textarea
                id=""
                rows="6"
                maxLength="480"
                className="w-[100%] outline-none border resize-none focus:bg-[#e7eeff] border-[#dedede] py-2 px-6 rounded-md"
                name="because"
                value={formik.values.because}
                onChange={(event) => {
                  const value = event.target.value;
                  // Count the number of lines (newlines)
                  const lineCount = value.split("\n").length;

                  // Allow input only if the number of lines is less than or equal to 5
                  if (lineCount <= 6) {
                    formik.handleChange(event);
                  }
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.because && formik.errors.because ? (
                <div className="text-danger">{formik.errors.because}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 items-start">
              <div>
                <label>
                  4. Werden aus Sicht der Beratungsperson Maßnahmen zur
                  Verbesserung der Pflege- und Betreuungssituation angeregt?
                </label>
              </div>

              <div className="flex flex-col justify-between w-full pl-4">
                <div className="flex flex-col">
                  {mainOptions.map(({ id, key, label }) => (
                    <>
                      <label key={id} htmlFor={id} className="flex space-x-3">
                        <input
                          type="checkbox"
                          id={id}
                          name={key}
                          className="form-checkbox"
                          checked={formik.values[key]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span>{label}</span>
                      </label>
                    </>
                  ))}
                </div>

                <div className="flex flex-wrap -mx-2">
                  {additionalOptions.map(({ id, key, label }) => (
                    <div key={id} className="w-full sm:w-1/3 px-2 ">
                      <label htmlFor={id} className="flex space-x-3">
                        <input
                          type="checkbox"
                          id={id}
                          name={key}
                          className="form-checkbox"
                          checked={formik.values[key]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span>{label}</span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col justify-between w-full ">
                  <label htmlFor="checkbox15" className="flex space-x-1 ">
                    <input
                      type="checkbox"
                      id="checkbox15"
                      className="form-checkbox"
                      name="further_measures_and_explanations_of_the_above_measures"
                      checked={
                        formik.values
                          .further_measures_and_explanations_of_the_above_measures
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="pl-2">
                      Weitere Maßnahmen und Erläuterungen zu o. a. Maßnahmen
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <textarea
                id=""
                rows="6"
                maxLength="480"
                className="w-[100%] resize-none outline-none border focus:bg-[#e7eeff] border-[#dedede] py-2 px-6 rounded-md"
                name="further_measures_and_explanations_of_the_above_measures_detail"
                value={
                  formik.values
                    .further_measures_and_explanations_of_the_above_measures_detail
                }
                onChange={(event) => {
                  const value = event.target.value;
                  // Count the number of lines (newlines)
                  const lineCount = value.split("\n").length;

                  // Allow input only if the number of lines is less than or equal to 5
                  if (lineCount <= 6) {
                    formik.handleChange(event);
                  }
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched
                .further_measures_and_explanations_of_the_above_measures_detail &&
              formik.errors
                .further_measures_and_explanations_of_the_above_measures_detail ? (
                <div className="text-danger">
                  {
                    formik.errors
                      .further_measures_and_explanations_of_the_above_measures_detail
                  }
                </div>
              ) : null}
            </div>

            <div className="flex gap-4">
              <label htmlFor="">
                5.
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="counselors_point_of_view"
                  className="form-checkbox mx-2"
                  checked={formik.values.counselors_point_of_view}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                Aus Sicht der Beratungsperson ist eine weitergehende Beratung
                nach § 7a SGB XI angezeigt.
              </label>
            </div>

            <div className="flex flex-col gap-3 border border-1 border-black-2 py-4 px-4">
              <h2 className="text-black-2 font-[700] text-[19px] mb-2">
                Information
              </h2>
              <p className="text-black">
                Der Beratungsbesuch dient der Sicherung der Qualität der
                häuslichen Pflege und der regelmäßigen Hilfestellung und
                praktischen pflegefachlichen Unterstützung der häuslich
                Pflegenden (§ 37 Abs. 3 SGB XI). Die Durchführung des
                Beratungsbesuches ist gegenüber der Pflegekasse oder dem
                privaten Versicherungsunternehmen zu bestätigen (§§ 37 Abs. 4,
                106a SGB XI). Die Weitergabe der beim Beratungsbesuch gewonnenen
                Erkenntnisse über die Möglichkeiten zur Verbesserung der
                häuslichen Pflegesituation darf an die Pflegekasse oder das
                private Versicherungsunternehmen und im Fall der
                Beihilfeberechtigung an die zuständige
                Beihilfefestsetzungsstelle nur mit Einwilligung der
                pflegebedürftigen Person vorgenommen werden. Die
                Datenverarbeitung dient der regelmäßigen Hilfestellung und
                Beratung der Pflegenden zur Sicherung der Pflegequalität.
              </p>

              <div className="flex gap-3 items-start">
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="information"
                  className="form-checkbox mx-2"
                  checked={formik.values.information}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="" className="text-black">
                  Die pflegebedürftige Person und die Pflegeperson(en) wurden
                  auch auf die Auskunfts-, Beratungs- und
                  Unterstützungsmöglichkeiten der für sie zuständigen
                  Pflegestützpunkte sowie der Pflegeberatung nach § 7a SGB XI
                  hingewiesen.
                </label>
              </div>

              <p className="text-black">
                Die Daten werden nicht an Dritte weitergegeben. Die Weitergabe
                der beim Beratungsbesuch gemachten Einschätzungen an die
                Pflegekasse oder das private Versicherungsunternehmen und im
                Fall der Beihilfeberechtigung an die zuständige
                Beihilfefestsetzungsstelle ist freiwillig. Aus einer Ablehnung
                der Einwilligung entstehen der pflegebedürftigen Person keine
                Nachteile. Bei Vorliegen einer akuten Gefahrensituation (Gefahr
                im Verzug) erfolgt die Weitergabe der Information, dass die
                Pflege nicht sichergestellt ist, jedoch auch ohne die
                Einwilligung der/ des Pflegebedürftigen. Eine akute
                Gefahrensituation liegt vor, wenn nach Einschätzung der
                Beratungsperson ein unmittelbarer Schaden für Leib oder Leben
                der/ des Pflegebedürftigen droht, weshalb ein sofortiges
                Einschreiten notwendig erscheint. Ebenfalls nicht erforderlich
                ist die Einwilligung für die Weitergabe der Information, dass
                aus Sicht der Beratungsperson eine weitergehende Beratung
                angezeigt ist.
              </p>

              <p>
                Die Einwilligung in die Datenverarbeitung kann jederzeit bei der
                zuständigen Pflegekasse oder dem privaten
                Versicherungsunternehmen und im Fall der Beihilfeberechtigung
                bei der zuständigen Beihilfefestsetzungsstelle – auch ohne
                Angaben von Gründen – ganz oder teilweise schriftlich mit
                Wirkung für die Zukunft widerrufen werden. Nach Erhalt des
                Widerrufs werden die betreffenden Daten nicht mehr genutzt bzw.
                verarbeitet und gelöscht. Dusrch den Widerruf der Einwilligung
                wird die Rechtsmäßigkeit der aufgrund der Einwilligung bis zum
                Zeitpunkt des Widerrufs erfolgten Verarbeitung nicht berührt.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-black-2 font-[700] text-[18px] mb-2">
                Einwilligungserklärung:
              </h2>
              <div className="flex gap-3 items-start">
                <input
                  type="checkbox"
                  id="checkbox1"
                  className="form-checkbox mx-2"
                  name="agree_to_the_transmission_of_the_information_3"
                  checked={
                    formik.values.agree_to_the_transmission_of_the_information_3
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="" className="text-black">
                  Ich stimme der Übermittlung der unter Ziffer 3. gemachten
                  Angaben zur Sicherstellung der Pflege- und
                  Betreu-ungs-situation an meine Pflegekasse bzw. mein privates
                  Versicherungsunternehmen zu.
                </label>
              </div>
              <div className="flex gap-3 items-start">
                <input
                  type="checkbox"
                  id="checkbox1"
                  className="form-checkbox mx-2"
                  name="agree_to_the_transmission_of_the_information_4"
                  checked={
                    formik.values.agree_to_the_transmission_of_the_information_4
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="" className="text-black">
                  Ich stimme der Übermittlung der unter Ziffer 4. genannten
                  Empfehlungen zur Verbesserung der Betreuungs-
                  undPflegesituation an meine Pflegekasse bzw. mein privates
                  Versicherungsunternehmen zu.
                </label>
              </div>
              <div className="flex gap-3 items-start">
                <input
                  type="checkbox"
                  id="checkbox1"
                  className="form-checkbox mx-2"
                  name="further_care_advice_according_to_7a_SGB"
                  checked={
                    formik.values.further_care_advice_according_to_7a_SGB
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="" className="text-black">
                  Ich wünsche eine weitergehende Pflegeberatung nach § 7a SGB XI
                </label>
              </div>

              <p>
                Im Rahmen des Beratungsbesuchs kann aufgrund des Gesamteindrucks
                bzw. auf Hinweise der pflegebedürftigen Per-son bzw. der
                Pflegeperson oder der gesetzlichen Betreuerin bzw. des
                gesetzlichen Betreuers zur Klärung von pflege-fachlichen
                Fragestellungen eine Inaugenscheinnahme von bestimmten
                Körperregionen durch die Beratungsperson er-forderlich sein.
                Eine solche Inaugenscheinnahme erfolgt nur mit Einwilligung der
                pflegebedürftigen Person:
              </p>

              <div className="flex gap-3 items-start">
                <input
                  type="checkbox"
                  id="checkbox1"
                  className="form-checkbox mx-2"
                  name="my_nursing_care_fund_or_my_private_insurance_company"
                  checked={
                    formik.values
                      .my_nursing_care_fund_or_my_private_insurance_company
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="" className="text-black">
                  Ich habe einer Inaugenscheinnahme zugestimmt und stimme der
                  Übermittlung dieser Information an meine Pfle-gekasse bzw.
                  mein privates Versicherungsunternehmen zu.
                </label>
              </div>

              <p>
                Im Rahmen einer Pflegeberatung nach § 7a SGB XI können die beim
                Beratungsbesuch gewonnenen Erkenntnisse von der Pflegekasse oder
                dem privaten Versicherungsunternehmen für die weitere Beratung
                (z. B. zu Unterstützungsange-boten) verarbeitet werden:
              </p>

              <div className="flex gap-3 items-start">
                <input
                  type="checkbox"
                  id="checkbox1"
                  className="form-checkbox mx-2"
                  name="nursing_care_advice_in_accordance_with_Section_7aSGB"
                  checked={
                    formik.values
                      .nursing_care_advice_in_accordance_with_Section_7aSGB
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="" className="text-black">
                  Ich stimme der Verarbeitung der übermittelten Ergebnisse des
                  Beratungsbesuches zur Pflegeberatung nach § 7aSGB XI zu.
                </label>
              </div>

              <div className="w-full flex justify-between mt-10">
                <div className="flex flex-col gap-2 w-[40%]">
                  <input
                    type="text"
                    className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                    name="place_date"
                    value={formik.values.place_date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.place_date && formik.errors.place_date ? (
                    <div className="text-danger">
                      {formik.errors.place_date}
                    </div>
                  ) : null}
                  <label className="text-[17px]">Ort, Datum</label>
                </div>
                <div className="w-[40%] ">
                  <div className="shadow-sm" id="sigContainer">
                    {formik.values.signature ? (
                      <img src={formik.values.signature} />
                    ) : (
                      <SignaturePad
                        canvasProps={{
                          width: 600,
                          height: 110,
                          className: "sigCanvas",
                        }}
                        ref={sigNAPad}
                      />
                    )}
                  </div>
                  <hr className="w-full h-1"></hr>
                  {formik.touched.signature && formik.errors.signature ? (
                    <div className="text-danger">{formik.errors.signature}</div>
                  ) : null}
                  <span>
                    Unterschrift der pflegebedürftigen Person bzw. des
                    gesetzlichen Betreuers/des Vertreters (nicht Zutreffendes
                    streichen)
                  </span>
                  <div className="my-2 flex gap-5">
                    {formik.values.signature ? (
                      <button
                        type="button"
                        onClick={Clears1}
                        className="border rounded-lg text-white bg-[#4880ff] py-2 px-8"
                      >
                        Clear
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={Saves1}
                        className="border rounded-lg text-white bg-[#4880ff] py-2 px-8"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start mt-5">
                <input
                  type="checkbox"
                  id="checkbox1"
                  className="form-checkbox mx-2"
                  name="the_assessments_made_for_the_person_in_need_of_care"
                  checked={
                    formik.values
                      .the_assessments_made_for_the_person_in_need_of_care
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="" className="text-black">
                  Die für die/ den Pflegebedürftigen getroffenen Einschätzungen
                  (Ziffer 1 und 2) sind nicht dokumentiert, weildie/der
                  Pflegebedürftige der Weitergabe dieser Daten nicht zugestimmt
                  hat. Die Einschätzungen sind auf der Aus-fertigung des
                  Nachweises über den Beratungsbesuch für den Pflegebedürftigen
                  dokumentiert.
                </label>
              </div>

              <div className="flex gap-3 items-start">
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="copy_of_the_certificate_was_given_to_the_person_in_need_of_care"
                  className="form-checkbox mx-2"
                  checked={
                    formik.values
                      .copy_of_the_certificate_was_given_to_the_person_in_need_of_care
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="" className="text-black">
                  Eine Ausfertigung des Nachweises wurde der pflegebedürftigen
                  Person ausgehändigt
                </label>
              </div>

              <div className="w-full flex justify-between mt-10">
                <div className="w-[40%] mt-16">
                  <div className="shadow-sm" id="sigContainer">
                    {formik.values.signature1 ? (
                      <img src={formik.values.signature1} />
                    ) : (
                      <SignaturePad
                        canvasProps={{
                          width: 600,
                          height: 110,
                          className: "sigCanvas",
                        }}
                        ref={sigNAPad1}
                      />
                    )}
                  </div>
                  <hr className="w-full h-1"></hr>
                  {formik.touched.signature1 && formik.errors.signature1 ? (
                    <div className="text-danger">
                      {formik.errors.signature1}
                    </div>
                  ) : null}
                  <span>
                    Stempel und Unterschrift der Beratungsperson (Pflegedienst/
                    anerkannte Beratungsstelle/beauf-tragte Pflegefachkraft/
                    Pflegeberater nach § 7a SGB XI/ kommunale Beratungsstelle)
                  </span>
                  <div className="my-2 flex gap-5">
                    {formik.values.signature1 ? (
                      <button
                        type="button"
                        onClick={Clears2}
                        className="border rounded-lg text-white bg-[#4880ff] py-2 px-8"
                      >
                        Clear
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={Saves2}
                        className="border rounded-lg text-white bg-[#4880ff] py-2 px-8"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-[40%]">
                  <input
                    type="text"
                    className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                    name="IK_of_the_nursing_service"
                    value={formik.values.IK_of_the_nursing_service}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.IK_of_the_nursing_service &&
                  formik.errors.IK_of_the_nursing_service ? (
                    <div className="text-danger">
                      {formik.errors.IK_of_the_nursing_service}
                    </div>
                  ) : null}

                  <label className="text-[17px]">
                    IK des Pflegedienstes/ der anerkannten Beratungsstelle/der
                    beauftragten Pflegefachkraft/ der kommunalen Beratungsstelle
                  </label>
                </div>
              </div>

              <h3 className="mt-5">
                Anschrift der Pflegekasse/ des privaten
                Versicherungsunternehmens/ der Beihilfefestsetzungsstelle:
              </h3>

              <div className="flex flex-col gap-2 my-3">
                <input
                  type="text"
                  className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                  name="longer_name"
                  value={formik.values.longer_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.longer_name && formik.errors.longer_name ? (
                  <div className="text-danger">{formik.errors.longer_name}</div>
                ) : null}
                <label>
                  Name (Bei längeren Namen bitte auch die nächste Zeile mit
                  verwenden.)
                </label>
              </div>

              <div className="flex flex-col gap-2 my-3">
                <input
                  type="text"
                  className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                  name="name2"
                  value={formik.values.name2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name2 && formik.errors.name2 ? (
                  <div className="text-danger">{formik.errors.name2}</div>
                ) : null}
                <label>Name</label>
              </div>

              <div className="flex flex-col gap-2 my-3">
                <input
                  type="text"
                  className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                  name="Straße2"
                  value={formik.values.Straße2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Straße2 && formik.errors.Straße2 ? (
                  <div className="text-danger">{formik.errors.Straße2}</div>
                ) : null}

                <label>Straße</label>
              </div>

              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-2">
                  <input
                    type="tel"
                    className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                    maxLength={5}
                    name="PLZ2"
                    value={formik.values.PLZ2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.PLZ2 && formik.errors.PLZ2 ? (
                    <div className="text-danger">{formik.errors.PLZ2}</div>
                  ) : null}
                  <label htmlFor="">PLZ</label>
                </div>
                <div className="flex flex-col gap-2 w-[70%]">
                  <input
                    type="text"
                    className="border focus:bg-[#e7eeff] outline-none border-[#dedede] py-2 px-6 rounded-md"
                    name="Ort2"
                    value={formik.values.Ort2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.Ort2 && formik.errors.Ort2 ? (
                    <div className="text-danger">{formik.errors.Ort2}</div>
                  ) : null}
                  <label htmlFor="">Ort</label>
                </div>
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
      <UploadingPdfs
        pdfData={pdfData}
        setPdfData={setPdfData}
        setLoader={setLoader}
        setUploadProgress={setUploadProgress}
      />
    </>
  );
};

export default PDF;
