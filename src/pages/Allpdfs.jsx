import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../basedurl";
import Loader from "../common/Loader";
import DownloadPdf from "../components/PDF/DownloadPdf";
import { fetchUsers } from "../store/userslice";
import { PenBoxIcon, SendIcon } from "lucide-react";

const AllPdf = () => {
  const { data, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [allpdf, setAllpdf] = useState([]);
  const [ids, setIds] = useState({
    user_id: "",
    pdf_id: [],
  });

  const sendEmail = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("user_id", ids.user_id);
    formdata.append("type", "PDF");
    ids.pdf_id.map((id, index) => {
      formdata.append(`pdf_id[${index}]`, id);
    });
    axiosInstance
      .post(`email/on/demand`, formdata)
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
  const sendInvoice = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("user_id", ids.user_id);
    formdata.append("type", "invoice");
    ids.pdf_id.map((id, index) => {
      formdata.append(`pdf_id[${index}]`, id);
    });
    axiosInstance
      .post(`email/on/demand`, formdata)
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

  const getpdf = (id) => {
    setLoader(true);
    axiosInstance
      .get(`get/single/pdf/by/user/${id}`)
      .then((response) => {
        const { data, message, status } = response;
        if (status) {
          setAllpdf(data);
          setIds({ ...ids, user_id: id });
        } else {
          toast.error(message);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred while fetching the PDFs.");
        setLoader(false);
      });
  };

  const pdfNickname = (id) => {
    const nickname = window.prompt("Enter Nickname");

    if (nickname !== null) {
      setLoader(true);
      const formdata = new FormData();
      formdata.append("name", nickname);
      formdata.append("id", id);

      axiosInstance
        .post(`add/nick/name`, formdata)
        .then((res) => {
          const { status, message } = res;
          if (status) {
            toast.success(message, {
              duration: 5000,
              position: "top-right",
            });
            getpdf(ids?.user_id);
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

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log(ids, "<====ids");
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <select
          disabled={loading}
          className="w-1/3 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
          onChange={(event) => getpdf(event.target.value)}
        >
          <option disabled hidden selected>
            Select users...
          </option>
          {data.length > 0 &&
            data.map((item, index) => (
              <option key={index} value={item.id}>
                {item.full_name}
              </option>
            ))}
        </select>
        {ids.pdf_id.length > 0 && (
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2.5 rounded-md py-4 pl-6 pr-10 font-medium justify-center bg-[#4880FF] text-white"
              onClick={sendEmail}
              disabled={loader || ids.pdf_id.length === 0}
            >
              <SendIcon /> Send PDFs to Users
            </button>
            <button
              className="flex items-center gap-2.5 rounded-md py-4 pl-6 pr-10 font-medium justify-center bg-[#4880FF] text-white"
              onClick={sendInvoice}
              disabled={loader || ids.pdf_id.length === 0}
            >
              <SendIcon /> Send Invoice to Users
            </button>
          </div>
        )}
      </div>

      {loader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3">
          {allpdf.length > 0 &&
            allpdf.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {item?.nick_name?.name ?? item?.user?.full_name}
                    <PenBoxIcon
                      color="#4880FF"
                      onClick={() => pdfNickname(item.id)}
                    />
                  </div>
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    value={item.id}
                  />
                </div>
                <PDFDownloadLink
                  document={<DownloadPdf data={item} />}
                  fileName={`z.B. ${item?.user?.full_name} - ${item?.person_need_care} - Pflegeberatung.pdf`}
                >
                  {({ url, loading }) => (
                    <>
                      {!loading && url ? (
                        <>
                          <iframe
                            src={url}
                            width="100%"
                            className="rounded-lg border h-[50vh]"
                          />
                          <button className="text-center gap-2.5 rounded-md py-2 px-4 font-medium bg-[#4880FF] text-white cursor-pointer mt-3">
                            Download
                          </button>
                        </>
                      ) : (
                        <Loader />
                      )}
                    </>
                  )}
                </PDFDownloadLink>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default AllPdf;
