/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import { SendIcon, ShoppingCart, Users } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../basedurl";
import Loader from "../../common/Loader";
import Breadcrumb from "../../components/Breadcrumb";
import { fetchProducts } from "../../store/productslice";
import { fetchUsers } from "../../store/userslice";

const Dashboard = () => {
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [values, setValues] = useState({ user_id: "" });
  const handleCancel3 = () => {
    setIsModalVisible3(false);
  };
  const [allPdf, setAllpdf] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.users);
  const {
    data: products,
    loading: productsLoading,
    error: productserror,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchUsers()); // Dispatch the thunk when the component mounts
    dispatch(fetchProducts()); // Dispatch the thunk when the component mounts
  }, [dispatch]);
  const sendEmail = (id) => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("user_id", values.user_id);
    formdata.append("type", "pdf");
    formdata.append("pdf_id", id);
    axiosInstance
      .post(`email/on/demand`, formdata)
      .then((res) => {
        console.log(res);
        const { status, message } = res;
        if (status) {
          toast.success(message, {
            duration: 5000,
            position: "top-right",
          });
          handleCancel3();
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
  const getUserPdf = (id) => {
    setLoader(true);

    axiosInstance
      .get(`get/all/pdf/files/user/${id}`)
      .then((response) => {
        const { data, message, status } = response;
        console.log(response, "response");
        if (status) {
          setAllpdf(data);
          setLoader(false);
        } else {
          toast.error(message);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  return loading || productsLoading || loader ? (
    <Loader />
  ) : (
    <>
      <Breadcrumb pageName="Dashboard" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6  2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <Users className="text-primary dark:text-white" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {data.length}{" "}
              </h4>
              <span className="text-sm font-medium">Total Users</span>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <ShoppingCart className="text-primary dark:text-white" />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {products.length}{" "}
              </h4>
              <span className="text-sm font-medium">Total Products</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Send Pdf To User"
        visible={isModalVisible3}
        width={600}
        className="!w-1/2"
        classNames={"!w-1/2"}
        okText={loading ? <Loader /> : "Send"}
        okButtonProps={{
          style: { display: "none" },
        }}
        cancelButtonProps={{
          style: { display: "none" },
        }}
        onCancel={handleCancel3}
      >
        <div>
          <select
            disabled={loading}
            className="w-1/3 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none mb-5"
            value={values.user_id}
            onChange={(event) => {
              setValues({
                user_id: event.target.value,
              });

              getUserPdf(event.target.value);
            }}
          >
            <option disabled hidden selected>
              Select users....
            </option>
            {data.length > 0 &&
              data.map((item, index) => (
                <option key={index} value={item.id}>
                  {item?.full_name}
                </option>
              ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3">
          {allPdf?.length > 0 ? (
            allPdf?.map((item, index) => (
              <>
                <div key={index}>
                  {item?.file_name}

                  <iframe
                    src={item.file_path}
                    width={"100%"}
                    className="rounded-lg border h-[50vh]"
                  />

                  <button
                    onClick={() => sendEmail(item.pdf_id)}
                    className=" text-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out  bg-[#4880FF] text-white cursor-pointer  mt-3 float-end"
                  >
                    Send{" "}
                  </button>
                </div>
              </>
            ))
          ) : (
            <p>No Pdf Found</p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
