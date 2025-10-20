/* eslint-disable react/prop-types */
import { pdf } from "@react-pdf/renderer";
import toast from "react-hot-toast";
import axiosInstance from "../../basedurl";
import DownloadPdf from "./DownloadPdf";
import DownloadPdf3 from "./DownloadPdf3";
import DownloadPdf4 from "./DownloadPdf4";
import DownloadPdf5 from "./DownloadPdf5";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UploadingPdfs = ({
  pdfData,
  setPdfData,
  setLoader,
  setUploadProgress,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [called, setCalled] = useState(false); // Prevent duplicate calls

  // Upload PDF function
  const uploadPdf = async (url, blob, pdfId) => {
    const formData = new FormData();
    formData.append("pdf", blob, `${pdfData?.name}.pdf`);
    formData.append(url.includes("user") ? "user_id" : "id", id);
    formData.append("pdf_id", pdfId);

    try {
      const res = await axiosInstance.post(`upload/${url}`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(
            `Uploading ${url.split("content/").pop().replace(/_/g, " ")}: ${progress}%`
          );
        },
      });
      const { status, message } = res;
      if (status) {
        if (url === "pdf/content/pdf_5") {
          navigate("/users");
        }
      } else {
        toast.error(message, {
          duration: 5000,
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Error uploading PDF:", err);
      toast.error("Failed to upload PDF", {
        duration: 5000,
        position: "top-right",
      });
    } finally {
      setUploadProgress(null); // Clear progress after completion
    }
  };

  // Function to generate and upload PDFs one by one
  const handlePdfUploads = async () => {
    if (!pdfData || called) return; // Check if already called

    setLoader(true);
    setCalled(true); // Set the lock to prevent duplicate calls

    const components = [DownloadPdf, DownloadPdf3, DownloadPdf4, DownloadPdf5];

    for (let i = 0; i < components.length; i++) {
      const Component = components[i];
      const uploadUrl =
        i === 0 ? "user/pdf/content" : `pdf/content/pdf_${i + 2}`;

      // Generate PDF blob
      const pdfInstance = pdf(<Component data={pdfData} />);
      const blob = await pdfInstance.toBlob();

      // Upload the generated PDF blob
      await uploadPdf(uploadUrl, blob, pdfData.id);
    }

    setPdfData(null); // Only reset pdfData once after all uploads complete
    setLoader(false);
  };

  // Trigger the PDF upload process only once when pdfData is available
  useEffect(() => {
    if (pdfData && !called) {
      handlePdfUploads();
    }
  }, [pdfData, called]); // Added `called` as dependency

  return null;
};

export default UploadingPdfs;
