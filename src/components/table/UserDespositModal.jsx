/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../basedurl";
import Loader from "../../common/Loader";

function UserDepositModal(props) {
    const { handleModalVisible, isModalVisible, Id, depositFields, setDepositFields, addDepositAmount, setDepositAmount, setIsAmountAdded, pageLoader } = props;


    const [loader, setLoader] = useState(false);
    const ratePerHour = 36;
    const transportCost = 6;

    const handleAddDeposit = () => {
        if (!addDepositAmount) return;
        setIsAmountAdded(true);
        setDepositFields((prevFields) => [
            ...prevFields,
            {
                date: "",
                start: "",
                end: "",
                hours: "",
                total: "",
                checkbox: false,
                totalWithTransport: 0,
                showDetails: true
            }
        ]);
    };


    const calculateHoursAndTotal = (start, end, index) => {
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);
        const hours = (endTime - startTime) / (1000 * 60 * 60);
        const total = hours * ratePerHour;
        const updatedFields = [...depositFields];
        updatedFields[index] = { ...updatedFields[index], hours, total };
        setDepositFields(updatedFields);
    };


    const handleStartTimeChange = (e, index) => {
        const updatedFields = [...depositFields];
        updatedFields[index].start = e.target.value;
        setDepositFields(updatedFields);
        if (updatedFields[index].end) {
            calculateHoursAndTotal(updatedFields[index].start, updatedFields[index].end, index);
        }
    };

    
    const handleEndTimeChange = (e, index) => {
        const updatedFields = [...depositFields];
        updatedFields[index].end = e.target.value;
        setDepositFields(updatedFields);
        if (updatedFields[index].start) {
            calculateHoursAndTotal(updatedFields[index].start, updatedFields[index].end, index);
        }
    };


    const handleCheckboxChange = (index, e) => {
        const updatedFields = [...depositFields];
        updatedFields[index].checkbox = e.target.checked;
        updatedFields[index].totalWithTransport = e.target.checked
            ? parseFloat(updatedFields[index].total) + parseFloat(transportCost)
            : parseFloat(updatedFields[index].total);
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
            formData.append(`user_id`, Id);
            formData.append(`money`, addDepositAmount);

            depositFields?.map((data, index) => {
                if (data?.id) {
                    formData.append(`id`, data?.id);
                }
                formData.append(`records[${index}][date]`, data.date);
                formData.append(`records[${index}][start]`, data.start);
                formData.append(`records[${index}][end]`, data.end);
                formData.append(`records[${index}][hours]`, data.hours);
                formData.append(`records[${index}][total]`, data.total);
                formData.append(`records[${index}][journey]`, data.totalWithTransport);
            });
            const response = await axiosInstance.post(`/store/draft/budget`, formData);
            const { status, message, data } = response;
            console.log(data, 'response');
            if (status) {
                toast.success(message, {
                    duration: 5000,
                    position: "top-right",
                });
                setLoader(false);
                handleModalVisible();
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

    const handleDateChange = (e, index) => {
        const updatedFields = [...depositFields];
        updatedFields[index].date = e.target.value;
        setDepositFields(updatedFields);
    };


    return (
        <>

            <Modal
                title="Add Deposit"
                visible={isModalVisible}
                width={600}
                onCancel={() => {
                    handleModalVisible();
                    setDepositFields([]);
                    setIsAmountAdded(false);
                    setDepositAmount("");
                }}
                footer={null}
            >
                {
                    pageLoader ? <Loader /> : (
                        <>
                            <div className="w-full p-4 max-h-[500px] overflow-y-auto">
                                <form onSubmit={handleSubmit}>
                                    <div className="relative mb-3 flex justify-center">
                                        <input
                                            type="number"
                                            value={addDepositAmount}
                                            onChange={(e) => setDepositAmount(e.target.value)}
                                            placeholder="Deposit"
                                            className="w-96 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                        />
                                          <span className="absolute  top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                                        <button
                                            type="button"
                                            onClick={handleAddDeposit}
                                            className="w-48 cursor-pointer rounded-lg bg-[#2F93F6] p-4 text-white transition hover:bg-opacity-90 mx-10"
                                        >
                                            Add Deposit Amount
                                        </button>
                                    </div>

                                    {depositFields?.map((field, index) => (
                                        <div key={index} className="mb-4 rounded-lg">
                                            {field.showDetails && (
                                                <>
                                                    <div className="flex mb-4 gap-5">
                                                        <div className="flex flex-col w-full">
                                                            <div className="relative mb-3 col-span-1">
                                                                <input
                                                                    type="date"
                                                                    value={field.date}
                                                                    onChange={(e) => handleDateChange(e, index)}
                                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                                                    placeholder="Select Date"
                                                                />
                                                            </div>
                                                            <div className="relative mb-3 col-span-1">
                                                                <input
                                                                    type="time"
                                                                    value={field.start}
                                                                    onChange={(e) => handleStartTimeChange(e, index)}
                                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                                                    placeholder="Start Time"
                                                                />
                                                            </div>
                                                            <div className="relative mb-3 col-span-1">
                                                                <input
                                                                    type="time"
                                                                    value={field.end}
                                                                    onChange={(e) => handleEndTimeChange(e, index)}
                                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                                                    placeholder="End Time"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col w-full">

                                                            {field.start && field.end && (
                                                                <>
                                                                    <div className="relative mb-3 col-span-1">
                                                                        <input
                                                                            type="number"
                                                                            name="hours"
                                                                            placeholder="Hours"
                                                                            value={field.hours}
                                                                            disabled
                                                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                                                        />
                                                                    </div>
                                                                    <div className="relative mb-3 col-span-1">
                                                                            <input
                                                                                type="number"
                                                                                name="total"
                                                                                placeholder="Total Amount"
                                                                                value={field.total}
                                                                                disabled
                                                                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                                                            />
                                                                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                                                                        </div>
                                                                    <div className="relative mt-3 flex justify-start col-span-1 flex-col">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                name="checkbox"
                                                                                checked={field.checkbox}
                                                                                onChange={(e) => handleCheckboxChange(index, e)}
                                                                                className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 rounded-md"
                                                                            />
                                                                            <label className="ml-2">Add Transport (6 €)</label>
                                                                        </div>
                                                                        {field.checkbox && (
                                                                            <div className="relative mb-3 ms-7 col-span-1">
                                                                                <label htmlFor="Total Amount"></label>
                                                                                Total Amount :
                                                                                <span> {field.totalWithTransport + ' €'}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="w-48 cursor-pointer rounded-lg p-4 text-white transition hover:bg-opacity-90 bg-[red]"
                                                        onClick={() => removeField(index)}
                                                    >
                                                        Remove Entry
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    ))}

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
                                                "Submit"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    )
                }
            </Modal>

        </>
    );
}

export default UserDepositModal;
