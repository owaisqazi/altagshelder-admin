/* eslint-disable react-hooks/exhaustive-deps */
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../basedurl";
import Loader from "../common/Loader";
import { fetchUsers } from "../store/userslice";
import { PenBoxIcon, SendIcon } from "lucide-react";
import moment from "moment/moment";
import { useParams } from "react-router-dom";
import DownloadPdf3 from "../components/PDF/DownloadPdf3";
import DownloadPdf4 from "../components/PDF/DownloadPdf4";
import DownloadPdf5 from "../components/PDF/DownloadPdf5";

const AllotherPdfs = () => {
  const { data, loading } = useSelector((state) => state.users);
  const { pdf_type } = useParams(null);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [allinvoices, setAllInovices] = useState([]);
  const [ids, setIds] = useState({
    user_id: "",
    pdf_id: [],
  });
  const getinovice = (id) => {
    setLoader(true);

    axiosInstance
      .get(`get/pdf/by/user/${id}/type/pdf${pdf_type}`)
      .then((response) => {
        const { data, message, status } = response;
        console.log(response, "response");
        if (status) {
          setAllInovices(data);
          setIds({ ...ids, user_id: id });

          setLoader(false);
        } else {
          toast.error(message);
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };
  const sendEmail = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("user_id", ids.user_id);
    formdata.append("type", "Inovice");
    ids.pdf_id.map((id, index) => {
      formdata.append(`pdf_id[${index}]`, id);
    });
    axiosInstance
      .post(`email/on/demand/pdf/pdf${pdf_type}`, formdata)
      .then((res) => {
        const { status, message } = res;
        if (status) {
          toast.success(message, {
            duration: 5000,
            position: "top-right",
          });
        } else {
          toast.error(message, {
            duration: 5000,
            position: "top-right",
          });
        }
        setIds({ ...ids, pdf_id: [] });
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred while sending the email.");
        setLoader(false);
      });
  };
  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { pdf_id } = ids;

    if (checked) {
      setIds({
        ...ids,
        pdf_id: [...pdf_id, value],
      });
    } else {
      setIds({
        ...ids,
        pdf_id: pdf_id.filter((id) => id !== value),
      });
    }
  };
  const pdfNickname = (id) => {
    const nickname = window.prompt("Enter Nickname");

    if (nickname !== null) {
      setLoader(true);
      const formdata = new FormData();
      formdata.append("name", nickname);
      formdata.append("id", id);

      axiosInstance
        .post(`add/pdf${pdf_type}/nick/name`, formdata)
        .then((res) => {
          const { status, message } = res;
          if (status) {
            toast.success(message, {
              duration: 5000,
              position: "top-right",
            });
            getinovice(ids?.user_id);
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
          toast.error("An error occurred while sending the email.");
          setLoader(false);
        });
    }
  };
  useEffect(() => {
    dispatch(fetchUsers());
    setAllInovices([]);
  }, [pdf_type]);
  console.log(allinvoices, "allPDFS");
  console.log(pdf_type, typeof pdf_type, "pdf_type");

  return (
    <>
      <div className="flex items-center justify-between mt-10">
        <select
          name=""
          id=""
          disabled={loading}
          className="w-1/3 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none mb-5"
          onChange={(event) => {
            const { value } = event.target;

            getinovice(value);
          }}
        >
          <option disabled hidden selected>
            Select users....
          </option>

          {data.length > 0 &&
            data.map((item, index) => (
              <option key={index} value={item?.id}>
                {item?.full_name}
              </option>
            ))}
        </select>
        {ids?.pdf_id?.length > 0 && (
          <button
            className="flex items-center gap-2.5 rounded-md py-4 pl-6 pr-10 font-medium justify-center bg-[#4880FF] text-white"
            onClick={sendEmail}
            disabled={loader || ids?.pdf_id?.length === 0}
          >
            <SendIcon /> Send Invoice to Users
          </button>
        )}
      </div>
      {loader ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3">
            {allinvoices?.length > 0 &&
              allinvoices?.map((item, index) => {
                const serialNumber =
                  item?.invoice?.[item?.invoice?.length - 1]?.serial?.serial_no;
                const Ausstellungsdatum = moment(
                  item?.invoice?.[item?.invoice?.length - 1]?.created_at
                ).format(`DD.MM.yyyy`);
                return (
                  <>
                    <div className="mb-2" key={index}>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          {pdf_type === "3"
                            ? item?.pdf_three?.nick_name ??
                              item?.user?.full_name
                            : pdf_type === "4"
                              ? item?.pdf_four?.nick_name ??
                                item?.user?.full_name
                              : pdf_type === "5" &&
                                (item?.pdf_five?.nick_name ??
                                  item?.user?.full_name)}
                          <PenBoxIcon
                            color="#4880FF"
                            onClick={() => {
                              if (pdf_type === "3") {
                                pdfNickname(item?.pdf_three?.id);
                              } else if (pdf_type === "4") {
                                pdfNickname(item?.pdf_four?.id);
                              } else if (pdf_type === "5") {
                                pdfNickname(item?.pdf_five?.id);
                              }
                            }}
                          />
                        </div>{" "}
                        <input
                          type="checkbox"
                          onChange={handleChange}
                          value={
                            pdf_type === "3"
                              ? item?.pdf_three?.parent_pdf_id
                              : pdf_type === "4"
                                ? item?.pdf_four?.parent_pdf_id
                                : pdf_type === "5" &&
                                  item?.pdf_five?.parent_pdf_id
                          }
                        />
                      </div>{" "}
                      {console.log(
                        item?.invoice,

                        "item?.invoice?"
                      )}
                      {pdf_type === "3" ? (
                        <PDFDownloadLink
                          document={<DownloadPdf3 data={item} />}
                          fileName={`z.B. ${serialNumber} - ${item?.user?.full_name} - ${Ausstellungsdatum}.pdf`}
                        >
                          {({ url, loading }) => {
                            if (!loading && url) {
                              return (
                                <>
                                  <iframe
                                    src={url}
                                    width={"100%"}
                                    className="rounded-lg border h-[50vh]"
                                  />
                                  <button className=" text-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out  bg-[#4880FF] text-white cursor-pointer  mt-3">
                                    Download{" "}
                                  </button>
                                </>
                              );
                            }
                            return <Loader />; // Optionally return a fallback UI if needed
                          }}
                        </PDFDownloadLink>
                      ) : pdf_type === "4" ? (
                        <PDFDownloadLink
                          document={<DownloadPdf4 data={item} />}
                          fileName={`z.B. ${serialNumber} - ${item?.user?.full_name} - ${Ausstellungsdatum}.pdf`}
                        >
                          {({ url, loading }) => {
                            if (!loading && url) {
                              return (
                                <>
                                  <iframe
                                    src={url}
                                    width={"100%"}
                                    className="rounded-lg border h-[50vh]"
                                  />
                                  <button className=" text-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out  bg-[#4880FF] text-white cursor-pointer  mt-3">
                                    Download{" "}
                                  </button>
                                </>
                              );
                            }
                            return <Loader />; // Optionally return a fallback UI if needed
                          }}
                        </PDFDownloadLink>
                      ) : (
                        pdf_type === "5" && (
                          <PDFDownloadLink
                            document={<DownloadPdf5 data={item} />}
                            fileName={`z.B. ${serialNumber} - ${item?.user?.full_name} - ${Ausstellungsdatum}.pdf`}
                          >
                            {({ url, loading }) => {
                              if (!loading && url) {
                                return (
                                  <>
                                    <iframe
                                      src={url}
                                      width={"100%"}
                                      className="rounded-lg border h-[50vh]"
                                    />
                                    <button className=" text-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out  bg-[#4880FF] text-white cursor-pointer  mt-3">
                                      Download{" "}
                                    </button>
                                  </>
                                );
                              }
                              return <Loader />; // Optionally return a fallback UI if needed
                            }}
                          </PDFDownloadLink>
                        )
                      )}
                    </div>
                  </>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default AllotherPdfs;
