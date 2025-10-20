/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosInstance from "../basedurl";
import Loader from "../common/Loader";

const AllTypespdfs = () => {
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const getAllPds = () => {
    setLoader(true);
    axiosInstance
      .get(`get/user/all/pdfs/by/userId/${id}`)
      .then((response) => {
        const { data, message, status } = response;
        if (status) {
          const allPdf = response.data.map((pdf) => pdf.pdf_links) || [];
          setPdfs(allPdf.flat(1));
          setLoader(false);
          toast.success(message);
        } else {
          toast.error(message);
          setLoader(false);
          console.log(message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred while fetching the PDFs.");
        setLoader(false);
      });
  };
  useEffect(() => getAllPds(), []);
  return loader ? (
    <Loader />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3">
      {pdfs.length > 0 &&
        pdfs.map((item, index) => {
          return (
            <>
              <div className="mb-2" key={index}>
                <label htmlFor="">{item?.file_name}</label>
                <iframe
                  src={item?.file_path}
                  width="100%"
                  className="rounded-lg border h-[50vh] mb-3"
                />
                <a
                  href={item?.file_path}
                  download
                  className="text-center gap-2.5 rounded-md py-2 px-4 font-medium bg-[#4880FF] text-white cursor-pointer mt-5 capitalize "
                >
                  Download {item?.type}
                </a>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default AllTypespdfs;
