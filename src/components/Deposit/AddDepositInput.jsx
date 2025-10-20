/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../basedurl";
import { Minus } from "lucide-react";
function AddDepositInput(props) {
  const { depositData, data, getAllBudget, depositFields, setDepositFields } =
    props || {};
  const [loader, setLoader] = useState(false);

  const ratePerHour = 36;

  const handleAddDeposit = () => {
    setDepositFields((prevFields) => [
      ...prevFields,
      {
        depositId: "",
        user_id: "",
        date: "",
        start: "",
        end: "",
        hours: "",
        total: "",
        isTransport: 0,
      },
    ]);
  };

  const calculateHoursAndTotal = (start, end, index) => {
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);

    const diffInMilliseconds = endTime - startTime;
    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );

    const formattedTime = `${hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : ""}${
      hours > 0 && minutes > 0 ? " and " : ""
    }${minutes > 0 ? `${minutes} min${minutes > 1 ? "s" : ""}` : ""}`;

    const total = (
      (diffInMilliseconds / (1000 * 60 * 60)) *
      ratePerHour
    ).toFixed(2);
    const updatedFields = [...depositFields];
    updatedFields[index] = {
      ...updatedFields[index],
      hours: formattedTime,
      total,
    };
    setDepositFields(updatedFields);
  };

  const handleCheckboxChange = (index, e) => {
    const updatedFields = [...depositFields];
    updatedFields[index].isTransport = e.target.checked ? 1 : 0;
    setDepositFields(updatedFields);
  };

  const removeField = (index) => {
    const updatedFields = depositFields.filter((_, i) => i !== index);
    setDepositFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const formData = new FormData();
      depositFields.forEach((field, fieldIndex) => {
        Object.entries(field).forEach(([key, value]) => {
          formData.append(`records[${fieldIndex}][${key}]`, value);
        });
      });

      const response = await axiosInstance.post(
        `/store/draft/budget`,
        formData
      );
      const { status, message, data } = response;
      console.log(data, "response");
      if (status) {
        toast.success(message, {
          duration: 5000,
          position: "top-right",
        });
        getAllBudget();
        setLoader(false);
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

  const handlerChangeInput = (index, field, value) => {
    const updateList = [...depositFields];
    updateList[index][field] = value;
    setDepositFields(updateList);
    if (updateList[index].start && updateList[index].end) {
      calculateHoursAndTotal(
        updateList[index].start,
        updateList[index].end,
        index
      );
    }
  };

  return (
    <>
      <div className="w-full p-4 bg-white rounded-md my-4">
        <form onSubmit={handleSubmit}>
          {depositFields?.map((field, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <div className="flex flex-wrap gap-4 lg:flex-nowrap">
                {/* Deposit Select */}
                <div className="flex-1 min-w-[150px]">
                  <label className="mb-1">Deposit</label>
                  <select
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 outline-none focus:border-primary"
                    onChange={(e) =>
                      handlerChangeInput(index, "depositId", e.target.value)
                    }
                    value={field.depositId}
                  >
                    <option disabled hidden value="">
                      Select Deposit...
                    </option>
                    {depositData?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* User Select */}
                <div className="flex-1 min-w-[150px]">
                  <label className="mb-1">User</label>
                  <select
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 outline-none focus:border-primary"
                    onChange={(e) =>
                      handlerChangeInput(index, "user_id", e.target.value)
                    }
                    value={field.user_id}
                  >
                    <option disabled hidden value="">
                      Select users...
                    </option>
                    {data?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="flex-1 min-w-[120px]">
                  <label className="mb-1">Date</label>

                  <input
                    type="date"
                    value={field.date}
                    onChange={(e) =>
                      handlerChangeInput(index, "date", e.target.value)
                    }
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 outline-none focus:border-primary"
                  />
                </div>

                {/* Start Time */}
                <div className="flex-1 min-w-[120px]">
                  <label className="mb-1">Start Time</label>

                  <input
                    type="time"
                    value={field.start}
                    onChange={(e) =>
                      handlerChangeInput(index, "start", e.target.value)
                    }
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 outline-none focus:border-primary"
                  />
                </div>

                {/* End Time */}
                <div className="flex-1 min-w-[120px]">
                  <label className="mb-1">End Time</label>

                  <input
                    type="time"
                    value={field.end}
                    onChange={(e) =>
                      handlerChangeInput(index, "end", e.target.value)
                    }
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 outline-none focus:border-primary"
                  />
                </div>

                {/* Hours */}
                <div className="flex-1 min-w-[100px]">
                  <label className="mb-1">Hours</label>

                  <input
                    type="text"
                    placeholder="Hours"
                    value={field.hours}
                    disabled
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 outline-none focus:border-primary"
                  />
                </div>

                {/* Total Amount */}
                <div className="flex-1 min-w-[120px] relative">
                  <label className="mb-1">Total Amount</label>

                  <input
                    type="number"
                    placeholder="Total Amount"
                    value={
                      field.isTransport === 1
                        ? Number(field.total) + 6
                        : field.total
                    }
                    disabled
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 outline-none focus:border-primary"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    €
                  </span>
                </div>

                {/* Transport Checkbox */}
                <div className="flex items-center min-w-[150px]">
                  <input
                    type="checkbox"
                    checked={field.isTransport === 1}
                    onChange={(e) => handleCheckboxChange(index, e)}
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 rounded-md"
                  />
                  <label className="ml-2">Add Transport (6 €)</label>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  className=" bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 transition bg-[red]"
                  onClick={() => removeField(index)}
                >
                  <Minus />
                </button>
              </div>
            </div>
          ))}
          <div className=" flex justify-center ">
            <button
              type="button"
              onClick={handleAddDeposit}
              className=" cursor-pointer rounded-lg bg-[#2F93F6] p-4 text-white transition hover:bg-opacity-90"
            >
              Add New Deposit Amount
            </button>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={loader}
              className=" cursor-pointer rounded-lg bg-[#2F93F6] p-4 text-white transition hover:bg-opacity-90"
            >
              {loader ? (
                <div role="status">
                  <div className="flex justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
                  </div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddDepositInput;
