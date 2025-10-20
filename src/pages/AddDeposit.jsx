/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../basedurl";
import Loader from "../common/Loader";
import AddDepositAmount from "../components/Deposit/AddDepositAmount";
import AddDepositInput from "../components/Deposit/AddDepositInput";
import { fetchUsers } from "../store/userslice";

function AddDeposit() {
  const [depositFields, setDepositFields] = useState([]);

  const [addDepositAmount, setDepositAmount] = useState([
    {
      label: `D1`,
      deposit_value: "",
    },
  ]);
  const [loader, setLoader] = useState(false);
  const getAllDepositAmount = () => {
    axiosInstance
      .post(`get/all/deposits`)
      .then((response) => {
        const { data, message, status } = response;
        if (status) {
          if (data.length > 0) setDepositAmount(data);
          else
            setDepositAmount([
              {
                label: `D1`,
                deposit_value: "",
              },
            ]);
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
  const getAllBudget = () => {
    setLoader(true);
    axiosInstance
      .get(`get/all/draft/budgets`)
      .then((res) => {
        const { status, message, data } = res;
        if (status) {
          setDepositFields(data);
          setLoader(false);
          console.log(data, "budgets");
        } else {
          setLoader(false);
          toast.error(message);
        }
      })
      .catch((error) => {
        setLoader;
        console.log(error);
      });
  };

  const { data } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    getAllDepositAmount();
    getAllBudget();
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <>
      <AddDepositAmount
        addDepositAmount={addDepositAmount}
        setDepositAmount={setDepositAmount}
        getAllDepositAmount={getAllDepositAmount}
        getAllBudget={getAllBudget}
      />
      <AddDepositInput
        depositFields={depositFields}
        setDepositFields={setDepositFields}
        getAllBudget={getAllBudget}
        depositData={addDepositAmount}
        data={data}
      />
    </>
  );
}

export default AddDeposit;
