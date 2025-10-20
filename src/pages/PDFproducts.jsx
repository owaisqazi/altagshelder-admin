import { Modal } from "antd";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axiosInstance from "../basedurl";
import Loader from "../common/Loader";
import Breadcrumb from "../components/Breadcrumb";
import Table from "../components/table/Table";
import { fetchProducts } from "../store/productslice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadPdf2 from "../components/PDF/DownloadPdf2";
const animatedComponents = makeAnimated();

const PDFproducts = () => {
  const dispatch = useDispatch();
  const { data: allPrdoucts, loading } = useSelector((state) => state.products);
  const [productids, setproductsIds] = useState([]);
  const { user_id, pdf_id } = useParams(null);
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);
  const [data, setData] = useState([]);
  const [qty, setQty] = useState([]);
  const [gst, setGst] = useState("");
  const getAssignedProducts = () => {
    setLoader(true);
    axiosInstance
      .get(`get/products/by/pdf/${pdf_id}`)
      .then((res) => {
        const { status, message, data } = res; // Assuming res.data contains status and message
        if (status) {
          setData(data);
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
  const assignNewProducts = () => {
    const values = new FormData();
    values.append("qty", qty);
    values.append("gst", gst);
    values.append("pdf_id", pdf_id);
    values.append("user_id", user_id);
    productids.map((product_id, index) =>
      values.append(`products[${index}][id]`, product_id.value)
    );
    qty.map((value, index) =>
      values.append(`products[${index}][qty]`, value.quantity)
    );

    setLoader(true);
    axiosInstance
      .post("assign/products", values)
      .then((res) => {
        const { status, message } = res; // Assuming res.data contains status and message
        if (status) {
          toast.success(message, {
            duration: 5000,
            position: "top-right",
          });
          handleCancel();
          genrateInvoice();
          getAssignedProducts();
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
  const onDelete = (id) => {
    setLoader(true);
    axiosInstance
      .delete(`del/assigned/product/${id}/${pdf_id}`)
      .then((res) => {
        const { status, message } = res; // Assuming res.data contains status and message
        if (status) {
          toast.success(message, {
            duration: 5000,
            position: "top-right",
          });
          getAssignedProducts();
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
  const genrateInvoice = () => {
    setLoader(true);
    axiosInstance
      .get(`get/prod/by/pdf/${pdf_id}/${user_id}`)
      .then((response) => {
        const { data, message, status } = response;
        if (status) {
          if (data.length > 0) {
            setInvoiceData(data);
          } else {
            toast.error("No products found for this PDF", {
              duration: 5000,
              position: "top-right",
            });
          }
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
  const uploadPdf = (blob) => {
    const formdata = new FormData();
    formdata.append("pdf", blob, `${data?.first_name}.pdf`);
    formdata.append("id", user_id);
    axiosInstance
      .post(`upload/pdf/content`, formdata)
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
  const getQty = (event, productId) => {
    const { value } = event.target;

    // Update the quantity for the specific product
    setQty((prevQty) => {
      const existingProduct = prevQty.find(
        (item) => item.productId === productId
      );

      if (existingProduct) {
        // Update the quantity if the product already exists in the array
        return prevQty.map((item) =>
          item.productId === productId ? { ...item, quantity: value } : item
        );
      } else {
        // Add the new product with its quantity to the array
        return [...prevQty, { productId, quantity: value }];
      }
    });
  };
  console.log(qty);
  const tableHeadnew = data && data.length > 0 ? Object.keys(data[0]) : [];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getAssignedProducts();
    dispatch(fetchProducts());
  }, []);
  return loader || loading ? (
    <Loader />
  ) : (
    <>
      <Table headerName={tableHeadnew} data={data} onDelete={onDelete}>
        <Breadcrumb pageName={"Assigned Products"}>
          <div
            onClick={showModal}
            className="flex items-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out justify-center bg-[#4880FF] text-white cursor-pointer"
          >
            Generate Invoice <Plus />
          </div>
        </Breadcrumb>
      </Table>
      <Modal
        title="Generate Invoice"
        visible={isModalVisible}
        onOk={assignNewProducts}
        okText="Generate Invoice"
        width={600}
        cancelText="Close"
        okButtonProps={{
          className: "rounded-md font-medium bg-[#4880FF] text-white",
        }}
        cancelButtonProps={{
          className: "rounded-md font-medium bg-danger text-white ",
        }}
        onCancel={handleCancel}
      >
        <div className="mb-3">
          <label className="text-[15.5px] mb-2.5 block font-medium text-black dark:text-white">
            Products Name
          </label>
          <div className="relative">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={setproductsIds}
              isMulti
              options={allPrdoucts.map((product) => {
                return {
                  value: product.id,
                  label: product.name,
                };
              })}
            />
          </div>
        </div>
        {productids.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {productids.map((product) => (
              <div key={product.value} className="mb-3">
                <label className="text-[15.5px] mb-2.5 block font-medium text-black dark:text-white">
                  {product.label} Quantity
                </label>
                <div className="relative">
                  <input
                    onChange={(event) => getQty(event, product.value)}
                    type="number"
                    name={product.label}
                    placeholder={`${product.label} Quantity`}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mb-3">
          <label className="text-[15.5px] mb-2.5 block font-medium text-black dark:text-white">
            GST (%)
          </label>
          <div className="relative">
            <input
              onChange={(event) => setGst(event.target.value)}
              type="number"
              name={"GST"}
              placeholder={`Enter GST (%)`}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>
      </Modal>
      {invoiceData.length > 0 && (
        <PDFDownloadLink
          document={<DownloadPdf2 invoiceData={invoiceData} />}
          fileName={`${invoiceData[invoiceData.length - 1].pdf.name}.pdf`}
        >
          {({ blob, url, loading }) => {
            if (!loading && url) {
              // Automatically opens the PDF in a new tab
              window.open(url);
              uploadPdf(blob);
              // Optionally clear invoice data if required
              // setInvoiceData(null);
            }
            return null; // Optionally return a fallback UI if needed
          }}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default PDFproducts;
