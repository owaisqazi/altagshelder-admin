import { Minus, PenBoxIcon, Plus } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../../basedurl";
import toast from "react-hot-toast";

function AddDepositAmount(props) {
  const {
    addDepositAmount,
    setDepositAmount,
    getAllDepositAmount,
    getAllBudget,
  } = props || {};
  const [loader, setLoader] = useState(false);

  const handleAddDeposit = () => {
    const existingLabels = addDepositAmount.map((field) => field.label);
    let newLabelNumber = 1;

    // Find the first available label that isn't in use.
    while (existingLabels.includes(`D${newLabelNumber}`)) {
      newLabelNumber++;
    }

    const newLabel = `D${newLabelNumber}`;

    setDepositAmount((prevFields) => [
      ...prevFields,
      {
        label: newLabel,
        deposit_value: "",
      },
    ]);
  };

  const removeField = (index) => {
    const updatedFields = addDepositAmount?.filter((_, i) => i !== index);
    setDepositAmount(updatedFields);
  };
  const handleDelete = (id) => {
    axiosInstance
      .delete(`del/deposit/${id}`)
      .then((response) => {
        const { status, message } = response;
        if (status) {
          toast.success(message, {
            duration: 5000,
            position: "top-right",
          });
          getAllDepositAmount();
          getAllBudget();
        } else {
          toast.error(message, {
            duration: 5000,
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  const handleUpdate = (id) => {
    const findDeposit = addDepositAmount.find((deposit) => deposit.id === id);

    const depositValue = window.prompt(
      "Update Value",
      findDeposit.deposit_value
    );
    if (depositValue !== null) {
      setLoader(true);
      const formdata = new FormData();

      formdata.append("label", findDeposit.label);
      formdata.append("value", depositValue);
      formdata.append("id", id);

      axiosInstance
        .post(`update/deposit`, formdata)
        .then((res) => {
          const { status, message } = res;
          if (status) {
            toast.success(message, {
              duration: 5000,
              position: "top-right",
            });
            getAllDepositAmount();
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
  const handleSubmit = async (e) => {
    console.log(addDepositAmount, "addDepositAmount");
    e.preventDefault();
    setLoader(true);
    try {
      const formData = new FormData();
      addDepositAmount.map((field, fieldIndex) => {
        formData.append(`deposits[${fieldIndex}][value]`, field.deposit_value);
        formData.append(`deposits[${fieldIndex}][label]`, field.label);
      });
      const response = await axiosInstance.post(`add/deposits`, formData);
      const { status, message, data } = response;
      console.log(data, "response");
      if (status) {
        toast.success(message, {
          duration: 5000,
          position: "top-right",
        });
        setLoader(false);
        getAllDepositAmount();
      } else {
        toast.error(message, {
          duration: 5000,
          position: "top-right",
        });
        setLoader(false);
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  return (
    <>
      <div className="w-full p-4 bg-white rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-5 ">
            {addDepositAmount?.map((field, index) => (
              <div
                key={index}
                className="mb-4 rounded-lg flex items-center gap-4"
              >
                <div>
                  <label className="flex gap-2">
                    {field.label}
                    {field.id && (
                      <PenBoxIcon
                        color="#4880FF"
                        onClick={() => handleUpdate(field.id)}
                      />
                    )}
                  </label>
                  <div className="relative mb-3 col-span-1">
                    <input
                      type="number"
                      name="deposit_value"
                      placeholder="Deposit"
                      value={field.deposit_value}
                      onChange={(e) =>
                        setDepositAmount((prevFields) => {
                          const newFields = [...prevFields];
                          newFields[index].deposit_value = e.target.value;
                          return newFields;
                        })
                      }
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      €
                    </span>
                  </div>
                </div>
                {addDepositAmount?.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="w-16 flex justify-center items-center h-12  cursor-pointer rounded-lg text-white transition hover:bg-opacity-90 bg-[red]"
                      onClick={() => {
                        if (field.id) {
                          handleDelete(field.id);
                        } else removeField(index);
                      }}
                    >
                      <Minus />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddDeposit}
            className="w-16 flex justify-center items-center h-12 cursor-pointer rounded-lg bg-[#2F93F6] text-white transition hover:bg-opacity-90"
          >
            <Plus />
          </button>

          <div className="mt-3">
            <button
              type="submit"
              disabled={loader}
              className="w-full cursor-pointer rounded-lg bg-[#2F93F6] p-4 text-white transition hover:bg-opacity-90"
            >
              {loader ? (
                <div role="status">
                  <div className="flex justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
                  </div>
                </div>
              ) : (
                "Add Deposit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddDepositAmount;
