import * as Yup from "yup";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../basedurl";
import Loader from "../common/Loader";
import Breadcrumb from "../components/Breadcrumb";
import Table from "../components/table/Table";
import { flattenCompanyData } from "../hooks/FlattenData";
import { fetchProducts } from "../store/productslice";
import { Modal } from "antd";
import { useFormik } from "formik";

const Products = () => {
  const invalidkeys = ["user", "pdf", "created_at", "updated_at"];
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);

  const onDelete = (id) => {
    let confrim = window.confirm("Press OK if you want delete!");
    if (confrim) {
      setLoader(true);
      axiosInstance
        .delete(`del/product/${id}`)
        .then((res) => {
          const { status, message } = res; // Assuming res.data contains status and message
          if (status) {
            toast.success(message, {
              duration: 5000,
              position: "top-right",
            });
            dispatch(fetchProducts());
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
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const tableHeadnew =
    data && data.length > 0 ? Object.keys(flattenCompanyData(data[0])) : [];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      gst: "",
      qty: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive")
        .min(1, "Price must be at least 1"),
    }),
    onSubmit: (values) => {
      setLoader(true);
      values.price = JSON.stringify(values.price);
      axiosInstance
        .post("add/products", values)
        .then((res) => {
          const { status, message } = res; // Assuming res.data contains status and message
          if (status) {
            toast.success(message, {
              duration: 5000,
              position: "top-right",
            });
            handleCancel();
            formik.resetForm();
            dispatch(fetchProducts());
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
    },
  });

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
        headerName={tableHeadnew}
        data={data}
        onDelete={onDelete}
        invalidkeys={invalidkeys}
      >
        <Breadcrumb pageName={"Products"}>
          <div
            onClick={showModal}
            className="flex items-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out justify-center bg-[#4880FF] text-white cursor-pointer"
          >
            Add Products <Plus />
          </div>
        </Breadcrumb>
      </Table>
      <Modal
        title="Add Product"
        visible={isModalVisible}
        onOk={formik.handleSubmit}
        okText="Submit"
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
        <div className="mb-6">
          <label className="text-[15.5px] mb-2.5 block font-medium text-black dark:text-white">
            Product Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Product Name"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? (
              <span className="text-danger fs-6 m-2">{formik.errors.name}</span>
            ) : null}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-[15.5px] mb-2.5 block font-medium text-black dark:text-white">
            Price ($)
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="Enter Product Price"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.errors.price && formik.touched.price ? (
              <span className="text-danger fs-6 m-2">
                {formik.errors.price}
              </span>
            ) : null}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-[15.5px] mb-2.5 block font-medium text-black dark:text-white">
            Quantity
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="Enter Product Quantity"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              name="qty"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.qty}
            />
            {formik.errors.qty && formik.touched.qty ? (
              <span className="text-danger fs-6 m-2">{formik.errors.qty}</span>
            ) : null}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-[15.5px] mb-2.5 block font-medium text-black dark:text-white">
            GST (%)
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Product GST (%)"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              name="gst"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gst}
            />
            {formik.errors.gst && formik.touched.gst ? (
              <span className="text-danger fs-6 m-2">{formik.errors.gst}</span>
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Products;
