/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { EyeIcon, FilesIcon, Printer, TrashIcon } from "lucide-react";
import PropTypes from "prop-types"; // Import PropTypes
import { useState } from "react";
import { flattenCompanyData } from "../../hooks/FlattenData";

const Table = ({
  headerName,
  data,
  onDelete,
  genratePdf,
  children,
  invalidkeys,
  onView,
  genrateAllPdf,
}) => {
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Filter the data based on the filter input
  const filteredData =
    data?.filter((item) => {
      const flattenedValues = flattenCompanyData(item);
      return Object.values(flattenedValues).some(
        (value) =>
          value != null &&
          value.toString().toLowerCase().includes(filter.toLowerCase())
      );
    }) || [];

  // Sort the data based on the current sort configuration
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = flattenCompanyData(a)[sortConfig.key];
      const bValue = flattenCompanyData(b)[sortConfig.key];

      if (aValue === bValue) {
        return 0;
      }
      if (sortConfig.direction === "ascending") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }
    return 0;
  });

  // Handle sorting when header is clicked
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filtered headers
  const newHeader = invalidkeys
    ? headerName && headerName.length > 0
      ? headerName.filter((key) => !invalidkeys.includes(key))
      : []
    : headerName;

  return (
    <div className="bg-white shadow-md sm:rounded-lg">
      <div className="p-4">
        {children}
        <div className="flex justify-end mt-1">
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-4 p-4 whitespace-nowrap">
                #{" "}
              </th>
              {[...newHeader].map((head, index) => (
                <th
                  key={index}
                  scope="col"
                  className={
                    index === 0
                      ? "w-4 p-4 whitespace-nowrap"
                      : "px-6 py-4 whitespace-nowrap "
                  }
                  onClick={() => handleSort(head)} // Add sorting click event
                  style={{ cursor: "pointer" }}
                >
                  {head.replace(/_/g, "")}
                  {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((values, index) => {
              const newValues = flattenCompanyData(values);
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td scope="col" className="w-4 p-4 whitespace-nowrap">
                    <input type="checkbox" />
                  </td>
                  {[...newHeader].map((key, keyIndex) => (
                    <td
                      key={keyIndex}
                      className={
                        keyIndex === 0
                          ? "w-4 p-4"
                          : "px-6 py-4 whitespace-nowrap"
                      }
                    >
                      {newValues[key]}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {genrateAllPdf && (
                        <FilesIcon
                          className="text-success"
                          onClick={() =>
                            genrateAllPdf(
                              values?.user_id
                                ? values?.user_id
                                : values?.product_id
                                  ? values?.product_id
                                  : values?.id
                            )
                          }
                        />
                      )}
                      {onView && (
                        <EyeIcon
                          className="text-secondary"
                          onClick={() =>
                            onView(
                              values?.user_id
                                ? values?.user_id
                                : values?.product_id
                                  ? values?.product_id
                                  : values?.id
                            )
                          }
                        />
                      )}
                      {genratePdf && (
                        <Printer
                          className="text-success"
                          onClick={() =>
                            genratePdf(
                              values?.user_id
                                ? values?.user_id
                                : values?.product_id
                                  ? values?.product_id
                                  : values?.id
                            )
                          }
                        />
                      )}

                      {onDelete && (
                        <TrashIcon
                          className="text-danger"
                          onClick={() =>
                            onDelete(
                              values?.user_id
                                ? values?.user_id
                                : values?.product_id
                                  ? values?.product_id
                                  : values?.id
                            )
                          }
                        />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  invalidkeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerName: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired, // Changed to array of objects
  onDelete: PropTypes.func.isRequired,
  genratePdf: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Table;
