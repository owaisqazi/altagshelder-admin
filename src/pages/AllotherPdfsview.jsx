/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
// import DownloadPdf5 from "../components/PDF/DownloadPdf5";
// import DownloadPdf from "../components/PDF/DownloadPdf";
// import axiosInstance from "../basedurl";
import DepositPdf from "../components/PDF/DownloadPdf";
import axiosInstance from "../basedurl";

const AllotherPdfsview = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [allinvoices, setAllInovices] = useState([]);
  const getInvoice = (id) => {
    axiosInstance
      .get(`get/single/pdf/by/user/${id}`)
      .then((response) => {
        const { data} = response;
        console.log(data, "response");
          setAllInovices(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Call getInvoice on component mount
  useEffect(() => {
    const userId = "1"; // Replace with actual user ID
    getInvoice(userId);
  }, []);

  // Generate the PDF Blob URL when allinvoices changes
  useEffect(() => {
    const generatePdfPreview = async () => {
      // if (allinvoices.length > 0) {
        const pdfInstance = <DepositPdf  data={allinvoices}/>;
        const blob = await pdf(pdfInstance).toBlob();
        setPdfUrl(URL.createObjectURL(blob));
      }
    // };

    generatePdfPreview();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">PDF Preview</h1>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          className="border rounded-lg"
          title="PDF Preview"
        />
      ) : (
        <p>Loading PDF preview...</p>
      )}
    </div>
  );
};

export default AllotherPdfsview;
