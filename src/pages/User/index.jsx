import { PDFDownloadLink } from "@react-pdf/renderer";
import { Modal } from "antd";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../basedurl";
import Loader from "../../common/Loader";
import Breadcrumb from "../../components/Breadcrumb";
import DownloadPdf from "../../components/PDF/DownloadPdf";
import DownloadPdf2 from "../../components/PDF/DownloadPdf2";
import Table from "../../components/table/Table";
import { flattenCompanyData } from "../../hooks/FlattenData";
import { fetchProducts } from "../../store/productslice";
import { fetchUsers } from "../../store/userslice";
import Adduser from "./Adduser";
const Users = () => {
  const navigate = useNavigate();
  const invalidkeys = [
    "user_id",
    "role_id",
    "slug",
    "phone_verified",
    "email_otp",
    "email_verified_at",
    "email_verified",
    "user_verified",
    "created_at",
    "insurance_data",
    "personal_data",
    "contact_people_data",
    "care_fund_data",
    "updated_at",
  ];
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);
  const [pdfData, setPdfData] = useState([]);

  const [ids, setIds] = useState({
    user_id: null,
    pdf_id: null,
    productsid: null,
  });
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const genratePDF = (id) => {
    setLoader(true);
    axiosInstance
      .get(`get/user/pdf/content/${id}`)
      .then((response) => {
        const { data, message, status } = response;
        if (status) {
          setIds({
            ...ids,
            user_id: id,
          });
          setPdfData(data);
          setIsModalVisible(true);
          setLoader(false);
          toast.success(message, {
            duration: 5000,
            position: "top-right",
          });
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
  };
  const onDelete = (id) => {
    let confirmation = window.confirm("Press Ok if you want to delete it.");
    if (confirmation) {
      axiosInstance
        .delete(`del/user/${id}`)
        .then((res) => {
          console.log(res);
          const { status, message } = res;
          if (status) {
            toast.success(message, {
              duration: 5000,
              position: "top-right",
            });
            dispatch(fetchUsers());

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
    }
  };
  const assignNewProducts = (user_id, pdf_id) => {
    const values = new FormData();

    values.append("pdf_id", pdf_id);
    values.append("user_id", user_id);

    setLoader(true);
    axiosInstance
      .post("assign/products", values)
      .then((res) => {
        console.log(res, "resInvoce");
        const { status, message, data } = res; // Assuming res.data contains status and message
        if (status) {
          toast.success(message, {
            duration: 5000,
            position: "top-right",
          });
          setInvoiceData(data);
          handleCancel();
        } else {
          toast.error(message, {
            duration: 5000,
            position: "top-right",
          });
        }
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
  };
  const uploadPdf = (url, blob, pdfId) => {
    console.log(url, blob, pdfId);
    const formdata = new FormData();
    formdata.append(
      "pdf",
      blob,
      `${invoiceData?.[invoiceData.length - 1]?.user?.full_name}.pdf`
    );
    formdata.append("id", invoiceData?.[invoiceData.length - 1]?.user_id);
    formdata.append("pdf_id", pdfId);
    axiosInstance
      .post(`upload/pdf/${url}`, formdata)
      .then((res) => {
        console.log(res);
        const { status, message } = res;
        if (status) {
          toast.success(message, {
            duration: 5000,
            position: "top-right",
          });

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
  };

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(invoiceData, "InvocieData");
  const tableHeadnew =
    data && data.length > 0 ? Object.keys(flattenCompanyData(data)) : [];
  console.log(pdfData, "pdfData");
  return loading || loader ? (
    <Loader />
  ) : error ? (
    toast.error(error, {
      duration: 5000,
      position: "top-right",
    })
  ) : (
    <>
      <Table
        invalidkeys={invalidkeys}
        headerName={tableHeadnew}
        data={data}
        onView={(id) => navigate(`/updateUser/${id}`)}
        onDelete={onDelete}
        genratePdf={genratePDF}
        genrateAllPdf={(id) => navigate(`/allTypespdfs/${id}`)}
      >
        <Breadcrumb pageName={"Users"}>
          <button
            className="
            flex items-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out justify-center bg-[#4880FF] text-white cursor-pointer"
            onClick={() => {
              setIsModalVisible2(true);
            }}
          >
            <Plus /> Add User
          </button>
        </Breadcrumb>
      </Table>
      <Modal
        title="View PDF"
        visible={isModalVisible}
        width={600}
        onOk={false}
        cancelText="Close"
        confirmLoading={loader}
        okButtonProps={{
          style: { display: "none" },
        }}
        cancelButtonProps={{
          style: { display: "none" },
        }}
        onCancel={handleCancel}
      >
        <div className=" mt-5">
          <div className="flex justify-end gap-2">
            <Link
              to={`/add/user/pdf/${ids.user_id}`}
              className="items-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out  bg-[#4880FF] text-white cursor-pointer  mb-3"
            >
              Update PDF{" "}
            </Link>
          </div>
          {pdfData.length > 0 ? (
            pdfData.map((pdf) => {
              return (
                pdf && (
                  <div
                    key={pdf.name}
                    className={`relative items-center p-4 cursor-pointer mb-3`}
                  >
                    <button
                      onClick={() => assignNewProducts(pdf?.user_id, pdf.id)}
                      className=" float-right items-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out  bg-[#4880FF] text-white cursor-pointer  mb-3"
                    >
                      Generate Invoice
                    </button>
                    <PDFDownloadLink
                      document={<DownloadPdf data={pdf} />}
                      fileName={`${pdf?.name}.pdf`}
                    >
                      {({ url, loading }) => {
                        if (!loading && url) {
                          return (
                            <>
                              <iframe
                                src={url}
                                width={"100%"}
                                height={"800"}
                                className="rounded-lg border"
                              />
                            </>
                          );
                        }
                        return <Loader />; // Fallback UI while loading
                      }}
                    </PDFDownloadLink>
                  </div>
                )
              );
            })
          ) : (
            <p className="text-center">NO PDF FOUND</p>
          )}
        </div>
      </Modal>
      <Modal
        title="Add User"
        visible={isModalVisible2}
        width={600}
        className="!w-1/2"
        classNames={"!w-1/2"}
        okButtonProps={{
          style: { display: "none" },
        }}
        cancelButtonProps={{
          style: { display: "none" },
        }}
        onCancel={handleCancel2}
      >
        <Adduser onHide={handleCancel2} />
      </Modal>
      {invoiceData.length > 0 &&
        invoiceData.map((item, index) => (
          <>
            {[DownloadPdf2].map((Component, i) => (
              <PDFDownloadLink
                key={`${index}-${i}`}
                document={<Component invoiceData={item} />}
                fileName={`${item?.user?.full_name}.pdf`}
              >
                {({ blob, url, loading }) => {
                  if (!loading && url) {
                    window.open(url);
                    uploadPdf(`content`, blob, item.id);

                    setInvoiceData([]);
                  }
                  return null;
                }}
              </PDFDownloadLink>
            ))}
          </>
        ))}
    </>
  );
};

export default Users;
