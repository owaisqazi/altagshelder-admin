import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { flattenCompanyData } from "../../hooks/FlattenData";
import axiosInstance from "../../basedurl";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DownloadTableExcel } from "react-export-table-to-excel";
import GoogleCalendar from "../googleCalendar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DepositPdf from "../PDF/DepositPdf";
const DepositTable = ({ data }) => {
  const tableRef = useRef(null);

  const doc = new jsPDF();
  autoTable(doc, { html: "#table_with_data" });
  // const downloadTable = () => {
  //   const doc = new jsPDF();
  //   autoTable(doc, { html: "#table_with_data" });
  //   doc.save("table.pdf");
  // };
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [deposits, setDeposits] = useState([]);

  const fetchUserDeposits = (id, date) => {
    console.log(id, date);
    axiosInstance
      .get(`/get/draft/budget/${id}/${date}`)
      .then((response) => {
        const { data, message, status } = response;
        if (status) {
          setDeposits(data);
        } else {
          toast.error(message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const filteredData =
    deposits?.filter((item) => {
      const flattenedValues = flattenCompanyData(item);
      return Object.values(flattenedValues).some(
        (value) =>
          value != null &&
          value.toString().toLowerCase().includes(filter.toLowerCase())
      );
    }) || [];

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = flattenCompanyData(a)[sortConfig.key];
      const bValue = flattenCompanyData(b)[sortConfig.key];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortConfig.direction === "ascending"
          ? aValue - bValue
          : bValue - aValue;
      }
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const subtotal = sortedData.reduce((acc, values) => {
    // If transport is included, add 6 to the total; otherwise, use the total as is
    const totalValue =
      values?.isTransport === 1
        ? Number(values?.total) + 6
        : Number(values?.total);
    return acc + totalValue;
  }, 0);
  const RemainingDeposittotal = sortedData.reduce((acc, values) => {
    // If transport is included, add 6 to the total; otherwise, use the total as is
    const totalValue = values?.remaining;
    return acc + totalValue;
  }, 0);


  const secondButtonRef = useRef(null);

  const handleFirstButtonClick = () => {
    if (secondButtonRef.current) {
      secondButtonRef.current.click(); // Trigger the second button's click
    }
  };
  return (
    <div className="bg-white shadow-md sm:rounded-lg">
      <div className="flex justify-between items-center mt-1">
        <div className="flex items-center gap-2 p-2">
          <select
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
            onChange={(event) => {
              const selectedUserId = event.target.value;
              const dateInput = document.querySelector("#dateInput").value;
              fetchUserDeposits(selectedUserId, dateInput || null); // Fetch with both values
            }}
          >
            <option disabled hidden selected>
              Select users....
            </option>
            {data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.full_name}
              </option>
            ))}
          </select>
          {console.log(
            document.querySelector("select")?.value,
            "document.querySelector()?.value"
          )}

          <select
            id="dateInput"
            disabled={
              document.querySelector("select")?.value === "Select users...."
            }
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
            onChange={(event) => {
              const selectedDate = event.target.value;
              const userId = document.querySelector("select").value;
              fetchUserDeposits(userId || "", selectedDate); // Fetch with both values
            }}
          >
            <option disabled hidden selected value={"null"}>
              Select Month....
            </option>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {moment().month(index).format("MMMM")}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 p-2">
          <Link to={`/add_deposit`}>
            <button
              type="button"
              className="w-40 cursor-pointer rounded-lg bg-[#2F93F6] p-4 text-white transition hover:bg-opacity-90"
            >
              Add Deposit
            </button>
          </Link>
          <button
            onClick={handleFirstButtonClick}
            disabled={sortedData.length < 1}

            className="w-40 cursor-pointer rounded-lg bg-[#2F93F6] p-4 text-white transition hover:bg-opacity-90"
          >
            Export PDF
          </button>
          <DownloadTableExcel
            filename="Depoist table"
            sheet="Depoist"
            currentTableRef={tableRef.current}
          >
            <button className="w-40 cursor-pointer rounded-lg bg-[#2F93F6] p-4 text-white transition hover:bg-opacity-90">
              {" "}
              Export Excel{" "}
            </button>
          </DownloadTableExcel>
        </div>
      </div>
      <GoogleCalendar tableData={sortedData} />
      <PDFDownloadLink
        document={<DepositPdf tableData={sortedData} />}
        fileName={`z.B.pdf`}
      >
        {({ url, loading }) => {
          if (!loading && url  ) {
            return (
              <>
                {/* <iframe
                  src={url}
                  width={"100%"}
                  className="rounded-lg border h-[50vh]"
                /> */}
                <button ref={secondButtonRef} className="hidden text-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out  bg-[#4880FF] text-white cursor-pointer  mt-3">
                  Download{" "}
                </button>
              </>
            );
          }
          return <p>Loading....</p>; // Optionally return a fallback UI if needed
        }}
      </PDFDownloadLink>
      <div className="p-4">
        <div className="flex justify-between mt-1">
          <h1 className="text-3xl text-black-2 font-bold">Deposit</h1>
          <input
            type="search"
            placeholder="Search...."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="overflow-x-auto relative">
        <table
          ref={tableRef}
          
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          {deposits?.length > 0 ? (
            <>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => handleSort("user.full_name")}
                    style={{ cursor: "pointer" }}
                  >
                    User Name
                    {/* {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"} */}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => handleSort("date")}
                    style={{ cursor: "pointer" }}
                  >
                    Date
                    {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => handleSort("hours")}
                    style={{ cursor: "pointer" }}
                  >
                    Hours
                    {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => handleSort("total")}
                    style={{ cursor: "pointer" }}
                  >
                    Transport{" "}
                    {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => handleSort("total")}
                    style={{ cursor: "pointer" }}
                  >
                    Amount
                    {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => handleSort("money")}
                    style={{ cursor: "pointer" }}
                  >
                    Deposit
                    {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => handleSort("money")}
                    style={{ cursor: "pointer" }}
                  >
                    Remaining Deposit
                    {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((values, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {values?.user?.full_name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {values?.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {values?.hours}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {values?.isTransport === 1 ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {values?.isTransport === 1
                        ? Number(values?.total) + 6
                        : values?.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {values?.deposit?.deposit_value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {values?.remaining}
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <p className="text-center py-4">No deposits found for this user.</p>
          )}
        </table>
      </div>
      <div className="flex flex-col justify-end items-end gap-3 mt-3 p-4">
        <h4>Total Amount: {subtotal.toFixed(2)}</h4>
        <h4>Total Remaining Depoist: {RemainingDeposittotal.toFixed(2)}</h4>
      </div>
    </div>
  );
};

DepositTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DepositTable;
